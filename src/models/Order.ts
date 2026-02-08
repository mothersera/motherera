
import mongoose, { Schema, Model } from 'mongoose';

export interface IOrder extends mongoose.Document {
  userId: string;
  shopifyOrderId: string;
  products: {
    productId: string;
    title: string;
    quantity: number;
    price: string;
  }[];
  totalAmount: string;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    shopifyOrderId: { type: String, required: true },
    products: [{
      productId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: String, required: true }
    }],
    totalAmount: { type: String, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    purchaseDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
