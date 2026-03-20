"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, Search, Trash2, CheckCircle2, MessageCircle, AlertCircle, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CounselorRequest {
  id: string;
  name: string;
  email: string;
  preferredTime: string;
  concern: string;
  status: "pending" | "contacted" | "completed";
  createdAt: Timestamp;
}

interface ShopifyOrder {
  id: number;
  orderNumber: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totalPrice: string;
  currency: string;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  lineItems: {
    id: number;
    title: string;
    quantity: number;
    price: string;
  }[];
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [requests, setRequests] = useState<CounselorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");

  // Admin Protection
  useEffect(() => {
    if (status === "loading") return;
    
    // Check if user is logged in and is the admin
    if (!session || session.user?.email !== "support@motherera.com") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Fetch real-time data
  useEffect(() => {
    if (session?.user?.email !== "support@motherera.com") return;

    const q = query(
      collection(db, "counselor_requests"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: CounselorRequest[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as CounselorRequest);
      });
      setRequests(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching requests:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session]);

  // Fetch Orders Data
  useEffect(() => {
    if (session?.user?.email !== "support@motherera.com") return;

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "counselor_requests", id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request? This action cannot be undone.")) return;
    
    try {
      await deleteDoc(doc(db, "counselor_requests", id));
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete request.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case "contacted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Contacted</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter & Search Logic
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredOrders = orders.filter(order => {
    const searchLower = orderSearchQuery.toLowerCase();
    const matchesSearch = 
      order.customer.email.toLowerCase().includes(searchLower) ||
      order.customer.firstName.toLowerCase().includes(searchLower) ||
      order.customer.lastName.toLowerCase().includes(searchLower) ||
      order.orderNumber.toString().includes(searchLower);
      
    const matchesStatus = orderStatusFilter === "all" || 
                          order.financialStatus === orderStatusFilter || 
                          order.fulfillmentStatus === orderStatusFilter;
                          
    return matchesSearch && matchesStatus;
  });

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
      case "fulfilled":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 capitalize">{status}</Badge>;
      case "pending":
      case "unfulfilled":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 capitalize">{status}</Badge>;
      case "refunded":
      case "cancelled":
      case "voided":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 capitalize">{status}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  if (status === "loading" || (status === "authenticated" && session.user?.email !== "support@motherera.com")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Admin Dashboard</h1>
        <p className="text-stone-500">Manage platform requests and shop orders.</p>
      </div>

      <Tabs defaultValue="counselor" className="w-full">
        <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 bg-stone-100/50 p-1 rounded-xl">
          <TabsTrigger value="counselor" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Counselor Requests
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="counselor">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input 
                  placeholder="Search by name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
              
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="p-12 text-center text-stone-500 flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-stone-300 mb-3" />
                  <p>No counselor requests found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-stone-50">
                    <TableRow>
                      <TableHead className="w-[200px]">Date</TableHead>
                      <TableHead>User Details</TableHead>
                      <TableHead>Preference & Concern</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((req) => (
                      <TableRow key={req.id} className="hover:bg-stone-50/50">
                        <TableCell className="text-stone-500 whitespace-nowrap">
                          {req.createdAt?.toDate ? new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }).format(req.createdAt.toDate()) : 'N/A'}
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-medium text-stone-900">{req.name}</div>
                          <div className="text-sm text-stone-500">
                            <a href={`mailto:${req.email}`} className="hover:text-rose-600 hover:underline">
                              {req.email}
                            </a>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            <span className="font-medium text-stone-700">Time:</span> <span className="capitalize">{req.preferredTime}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-stone-700">Concern:</span> <span className="capitalize">{req.concern}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {getStatusBadge(req.status)}
                        </TableCell>
                        
                        <TableCell className="text-right space-x-2 whitespace-nowrap">
                          <Select 
                            value={req.status} 
                            onValueChange={(val) => handleUpdateStatus(req.id, val)}
                          >
                            <SelectTrigger className="w-[130px] inline-flex h-8 text-xs">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Mark Pending</SelectItem>
                              <SelectItem value="contacted">Mark Contacted</SelectItem>
                              <SelectItem value="completed">Mark Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(req.id)}
                            className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input 
                  placeholder="Search by order number or email..." 
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
              
              <div className="w-full sm:w-48">
                <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending Payment</SelectItem>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {ordersLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-stone-500 flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-stone-300 mb-3" />
                  <p>No shop orders found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-stone-50">
                    <TableRow>
                      <TableHead className="w-[120px]">Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-stone-50/50">
                        <TableCell>
                          <div className="font-bold text-stone-900">#{order.orderNumber}</div>
                          <div className="text-xs text-stone-500 whitespace-nowrap">
                            {new Intl.DateTimeFormat('en-US', {
                              dateStyle: 'medium'
                            }).format(new Date(order.createdAt))}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-medium text-stone-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-sm text-stone-500">
                            <a href={`mailto:${order.customer.email}`} className="hover:text-rose-600 hover:underline">
                              {order.customer.email}
                            </a>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <ul className="text-sm text-stone-600 space-y-1">
                            {order.lineItems.map(item => (
                              <li key={item.id} className="line-clamp-1">
                                <span className="font-medium">{item.quantity}x</span> {item.title}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                        
                        <TableCell className="font-medium text-stone-900">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: order.currency
                          }).format(parseFloat(order.totalPrice))}
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex flex-col gap-2 items-start">
                            {getOrderStatusBadge(order.financialStatus)}
                            {getOrderStatusBadge(order.fulfillmentStatus)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
