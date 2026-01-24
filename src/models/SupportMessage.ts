import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISupportMessage extends Document {
  userId: string; // Server-resolved ID
  userName: string;
  userEmail: string;
  message: string;
  status: 'open' | 'replied' | 'closed';
  adminReply?: {
    text: string;
    repliedAt: Date;
    repliedBy: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SupportMessageSchema: Schema<ISupportMessage> = new Schema(
  {
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['open', 'replied', 'closed'], default: 'open' },
    adminReply: {
      text: { type: String },
      repliedAt: { type: Date },
      repliedBy: { type: String }
    },
  },
  { timestamps: true }
);

const SupportMessage: Model<ISupportMessage> = mongoose.models.SupportMessage || mongoose.model<ISupportMessage>('SupportMessage', SupportMessageSchema);

export default SupportMessage;
