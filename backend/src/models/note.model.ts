import mongoose from 'mongoose';

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  summary?: string;
  userTags: string[];
  aiTags: string[];
  user: mongoose.Schema.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: false },
  userTags: { type: [String], default: [] },
  aiTags:   { type: [String], default: [] },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Note = mongoose.model<INote>('Note', noteSchema);
