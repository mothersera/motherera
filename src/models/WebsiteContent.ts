import mongoose, { Schema, Model } from "mongoose";

export interface IWebsiteContent extends mongoose.Document {
  title: string;
  url: string;
  content: string;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteContentSchema: Schema<IWebsiteContent> = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    embedding: { type: [Number], required: true },
  },
  { timestamps: true, collection: "website_content" }
);

const WebsiteContent: Model<IWebsiteContent> =
  mongoose.models.WebsiteContent || mongoose.model<IWebsiteContent>("WebsiteContent", WebsiteContentSchema);

export default WebsiteContent;
