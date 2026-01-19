import mongoose, { Schema, Model } from 'mongoose';

export interface ISubscription extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  plan: 'basic' | 'premium' | 'specialized';
  status: 'active' | 'past_due' | 'canceled' | 'incomplete';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['basic', 'premium', 'specialized'], required: true },
    status: { type: String, enum: ['active', 'past_due', 'canceled', 'incomplete'], default: 'active' },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    currentPeriodStart: { type: Date, required: true },
    currentPeriodEnd: { type: Date, required: true },
  },
  { timestamps: true }
);

const Subscription: Model<ISubscription> = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
