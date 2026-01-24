import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IForumPost extends Document {
  authorId: string; // Server-resolved ID
  authorName: string;
  title: string;
  content: string;
  category: 'Pregnancy' | 'Postpartum' | 'Child Nutrition' | 'Mental Wellness' | 'Single Parents' | 'General';
  likes: string[]; // Array of userIds who liked
  isHidden: boolean; // For moderation
  createdAt: Date;
  updatedAt: Date;
}

const ForumPostSchema: Schema<IForumPost> = new Schema(
  {
    authorId: { type: String, required: true, index: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true, maxlength: 150 },
    content: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['Pregnancy', 'Postpartum', 'Child Nutrition', 'Mental Wellness', 'Single Parents', 'General'],
      default: 'General'
    },
    likes: { type: [String], default: [] },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ForumPost: Model<IForumPost> = mongoose.models.ForumPost || mongoose.model<IForumPost>('ForumPost', ForumPostSchema);

export default ForumPost;
