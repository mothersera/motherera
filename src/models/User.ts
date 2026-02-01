import mongoose, { Schema, Model } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'mother' | 'expert' | 'admin';
  // Mother specific fields
  motherhoodStage?: 'pregnancy' | 'postpartum' | 'child_0_5' | 'toddler';
  healthConditions?: string[];
  dietaryPreference?: 'veg' | 'non-veg' | 'vegan' | 'egg';
  subscriptionPlan?: 'basic' | 'premium' | 'specialized';
  subscriptionStatus?: 'active' | 'inactive' | 'canceled';
  subscriptionSource?: string;
  subscribedAt?: Date;
  // Expert specific fields
  specialization?: string;
  experience?: number;
  isVerified?: boolean;
  availability?: string[]; // e.g., ["Mon 10-12", "Wed 14-16"]
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    image: { type: String },
    role: { type: String, enum: ['mother', 'expert', 'admin'], default: 'mother' },
    
    // Mother fields
    motherhoodStage: { 
      type: String, 
      enum: ['pregnancy', 'postpartum', 'child_0_5', 'toddler'],
      required: function(this: IUser) { return this.role === 'mother'; }
    },
    healthConditions: { type: [String], default: [] },
    dietaryPreference: { type: String, enum: ['veg', 'non-veg', 'vegan', 'egg'] },
    subscriptionPlan: { type: String, enum: ['basic', 'premium', 'specialized'], default: 'basic' },
    subscriptionStatus: { type: String, enum: ['active', 'inactive', 'canceled'], default: 'active' }, // simplified for now
    subscriptionSource: { type: String },
    subscribedAt: { type: Date },

    // Expert fields
    specialization: { type: String },
    experience: { type: Number },
    isVerified: { type: Boolean, default: false },
    availability: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Prevent overwriting model if already compiled
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
