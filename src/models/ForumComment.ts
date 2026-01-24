import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IForumComment extends Document {
  postId: mongoose.Types.ObjectId;
  authorId: string;
  authorName: string;
  content: string;
  isHidden: boolean; // For moderation
  createdAt: Date;
  updatedAt: Date;
}

const ForumCommentSchema: Schema<IForumComment> = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'ForumPost', required: true, index: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    content: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ForumComment: Model<IForumComment> = mongoose.models.ForumComment || mongoose.model<IForumComment>('ForumComment', ForumCommentSchema);

export default ForumComment;
