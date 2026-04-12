import mongoose, { Schema, Model } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'mother' | 'expert' | 'admin';
  // Mother specific fields
  motherhoodStage?: 'pregnancy' | 'postpartum' | 'child_0_5' | 'toddler';
  lifecycle?: {
    expectedDueDate?: Date;
    gestationalAgeWeeks?: number;
    childBirthDates?: Date[];
    wellnessObjectives?: string[];
    stageId?: string;
    stageLabel?: string;
    confidence?: string;
    derivedFrom?: string;
    updatedAt?: Date;
  };
  healthConditions?: string[];
  dietaryPreference?: 'veg' | 'non-veg' | 'vegan' | 'egg';
  activeDietPlan?: boolean;
  planStartDate?: Date;
  weeklyPlan?: unknown;
  subscriptionPlan?: 'basic' | 'premium' | 'specialized';
  subscriptionStatus?: 'active' | 'inactive' | 'expired' | 'canceled';
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
    lifecycle: {
      expectedDueDate: { type: Date },
      gestationalAgeWeeks: { type: Number },
      childBirthDates: { type: [Date], default: [] },
      wellnessObjectives: { type: [String], default: [] },
      stageId: { type: String },
      stageLabel: { type: String },
      confidence: { type: String },
      derivedFrom: { type: String },
      updatedAt: { type: Date },
    },
    healthConditions: { type: [String], default: [] },
    dietaryPreference: { type: String, enum: ['veg', 'non-veg', 'vegan', 'egg', 'keto', 'vegetarian', 'non-vegetarian', 'eggetarian'] },
    
    // Premium Diet Plan
    activeDietPlan: { type: Boolean, default: false },
    planStartDate: { type: Date },
    weeklyPlan: { type: Object }, // Stores the 7-day plan structure

    subscriptionPlan: { type: String, enum: ['basic', 'premium', 'specialized'], default: 'basic' },
    subscriptionStatus: { type: String, enum: ['active', 'inactive', 'expired', 'canceled'], default: 'active' },
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
