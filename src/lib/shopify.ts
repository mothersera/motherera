
// This is a wrapper for Shopify Storefront API
// For now, we'll use mock data to demonstrate the UI functionality.
// In production, you would use the actual Shopify Storefront API credentials.

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  price: string;
  compareAtPrice?: string;
  currency: string;
  images: { src: string; alt: string }[];
  category: 'Baby Care' | 'Feeding' | 'Sleep' | 'Hygiene & Safety' | 'Mother Wellness';
  tags: string[];
  recommendedStage?: string[]; // pregnancy, postpartum, newborn, toddler
  shopifyId?: string; // Real Shopify ID for Buy Button
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    handle: 'organic-cotton-baby-onesie',
    title: 'Organic Cotton Baby Onesie',
    description: 'Soft, breathable, and chemical-free organic cotton onesie for your little one.',
    descriptionHtml: '<p>Soft, breathable, and chemical-free organic cotton onesie for your little one.</p>',
    price: '899.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1522771753035-4850d32fa302?auto=format&fit=crop&q=80&w=800', alt: 'Baby Onesie' }],
    category: 'Baby Care',
    tags: ['clothing', 'organic', 'soft'],
    recommendedStage: ['newborn', 'child_0_5'],
    shopifyId: '10118653149460'
  },
  {
    id: 'prod_2',
    handle: 'ergonomic-baby-carrier',
    title: 'Ergonomic Baby Carrier',
    description: 'Keep your baby close and your hands free with our ergonomic carrier.',
    descriptionHtml: '<p>Keep your baby close and your hands free with our ergonomic carrier.</p>',
    price: '2499.00',
    compareAtPrice: '3499.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1520013320623-28f0b09436d9?auto=format&fit=crop&q=80&w=800', alt: 'Baby Carrier' }],
    category: 'Baby Care',
    tags: ['gear', 'travel'],
    recommendedStage: ['newborn', 'child_0_5', 'toddler'],
    shopifyId: '10118653149460' // Using same ID for demo as requested by "Map products" but lacking unique IDs
  },
  {
    id: 'prod_3',
    handle: 'silicone-feeding-set',
    title: 'Silicone Feeding Set',
    description: 'BPA-free silicone bowl, spoon, and bib set for messy eaters.',
    descriptionHtml: '<p>BPA-free silicone bowl, spoon, and bib set for messy eaters.</p>',
    price: '1299.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1596700683057-0dc221087e53?auto=format&fit=crop&q=80&w=800', alt: 'Feeding Set' }],
    category: 'Feeding',
    tags: ['feeding', 'weaning'],
    recommendedStage: ['child_0_5', 'toddler'],
    shopifyId: '10118653149460'
  },
  {
    id: 'prod_4',
    handle: 'postpartum-recovery-kit',
    title: 'Postpartum Recovery Kit',
    description: 'Essential items for a comfortable and quicker postpartum recovery.',
    descriptionHtml: '<p>Essential items for a comfortable and quicker postpartum recovery.</p>',
    price: '3999.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1555819206-98a44b94420e?auto=format&fit=crop&q=80&w=800', alt: 'Recovery Kit' }],
    category: 'Mother Wellness',
    tags: ['recovery', 'mom-care'],
    recommendedStage: ['postpartum'],
    shopifyId: '10118653149460'
  },
  {
    id: 'prod_5',
    handle: 'pregnancy-pillow', // Mapping "Portable Sleep Device" to this or adding new? User said "Portable Sleep Device -> Sleep". I'll rename/repurpose.
    title: 'Portable Sleep Device', // Renaming per request
    description: 'Support your back, hips, and belly for a good night\'s sleep.',
    descriptionHtml: '<p>Support your back, hips, and belly for a good night\'s sleep.</p>',
    price: '1899.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1542866789-bb9c9d086a5d?auto=format&fit=crop&q=80&w=800', alt: 'Pregnancy Pillow' }],
    category: 'Sleep',
    tags: ['sleep', 'comfort'],
    recommendedStage: ['pregnancy'],
    shopifyId: '10118653149460'
  },
  {
    id: 'prod_6',
    handle: 'baby-monitor',
    title: 'Smart Baby Monitor',
    description: 'HD video, night vision, and two-way audio to keep an eye on your baby.',
    descriptionHtml: '<p>HD video, night vision, and two-way audio to keep an eye on your baby.</p>',
    price: '4999.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800', alt: 'Baby Monitor' }],
    category: 'Hygiene & Safety',
    tags: ['safety', 'tech'],
    recommendedStage: ['newborn', 'child_0_5']
  },
  {
    id: 'prod_7',
    handle: 'breast-pump-electric',
    title: 'Electric Breast Pump',
    description: 'Efficient and quiet electric breast pump for modern moms.',
    descriptionHtml: '<p>Efficient and quiet electric breast pump for modern moms.</p>',
    price: '3499.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1628745995473-b258414441b4?auto=format&fit=crop&q=80&w=800', alt: 'Breast Pump' }],
    category: 'Feeding',
    tags: ['nursing', 'essentials'],
    recommendedStage: ['postpartum', 'newborn']
  },
  {
    id: 'prod_8',
    handle: 'stretch-mark-cream',
    title: 'Natural Stretch Mark Cream',
    description: 'Nourishing cream to prevent and reduce stretch marks.',
    descriptionHtml: '<p>Nourishing cream to prevent and reduce stretch marks.</p>',
    price: '699.00',
    currency: 'INR',
    images: [{ src: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800', alt: 'Cream' }],
    category: 'Mother Wellness',
    tags: ['skincare', 'selfcare'],
    recommendedStage: ['pregnancy', 'postpartum']
  }
];

export async function fetchProducts(category?: string, stage?: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let products = [...MOCK_PRODUCTS];

  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  // Personalization logic: Boost products matching the stage, but don't filter out completely unless strict
  // For this demo, we'll just return all matching category, but sort by stage relevance if provided
  if (stage) {
    products.sort((a, b) => {
      const aMatch = a.recommendedStage?.some(s => stage.includes(s)) ? 1 : 0;
      const bMatch = b.recommendedStage?.some(s => stage.includes(s)) ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  return products;
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PRODUCTS.find(p => p.handle === handle) || null;
}

export async function createCheckout(productId: string, quantity: number = 1): Promise<string> {
  // Simulate creating a checkout and returning a URL
  // In a real app, you'd call Shopify's checkoutCreate mutation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find the product handle to pass to success page (since we only passed ID)
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  const handle = product ? product.handle : 'unknown';

  // For DEMO purposes, we redirect to our internal success page to simulate the full loop
  // In a real app, this would return `webUrl` from Shopify API
  return `/dashboard/shop/success?product=${handle}&qty=${quantity}`;
}
