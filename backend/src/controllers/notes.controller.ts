import { Request, Response } from 'express';
import { Note } from '../models/note.model';
import { generateSummaryAndTags } from '../utils/ai';


export class NotesController {

  static async createNote(req: Request, res: Response): Promise<void> {
    const { title, content, userTags = [] } = req.body;
    try {      
      // Ensure user exists in request
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      // Generate AI summary and tags
      const { summary, suggestedTags } = await generateSummaryAndTags(content);
      console.log('AI Generation:', { summary, suggestedTags });

      // Create note with proper user ID
      const note = await Note.create({
        title,
        content,
        summary,
        userTags, 
        aiTags: suggestedTags,
        user: req.user.id
      });

      console.log('Created note:', note);
      res.status(201).json(note);
    } catch (err) {
      console.error('Note creation error:', err);
      res.status(500).json({ 
        msg: 'Could not create note',
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  }
  
  static async getNotes(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const notes = await Note.find({ user: req.user.id })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ msg: 'Could not fetch notes' });
    }
  }

  static async getNote(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
      if (!note) {
        res.status(404).json({ msg: 'Note not found' });
        return;
      }
      res.json(note);
    } catch (err) {
      res.status(500).json({ msg: 'Could not fetch note' });
    }
  }

  static async updateNote(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const { title, content, userTags } = req.body;      
      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, content, userTags: [...userTags] },
        { new: true }
      );

      if (!updatedNote) {
        res.status(404).json({ msg: 'Note not found' });
        return;
      }
      res.json(updatedNote);
    } catch (err) {
      res.status(500).json({ msg: 'Could not update note' });
    }
  }

  static async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const deletedNote = await Note.findOneAndDelete({ 
        _id: req.params.id, 
        user: req.user.id 
      });

      if (!deletedNote) {
        res.status(404).json({ msg: 'Note not found' });
        return;
      }
      res.json({ msg: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Could not delete note' });
    }
  }

  static async searchNotes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const { query } = req.query;
      const regex = new RegExp(query as string, 'i');
      const notes = await Note.find({
        user: req.user.id,
        $or: [
          { title: regex },
          { tags: regex }
        ]
      });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ msg: 'Search failed' });
    }
  }

  static async getNoteById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const note = await Note.findOne({ 
        _id: req.params.id,
        user: req.user.id
      });
      
      if (!note) {
        res.status(404).json({ msg: 'Note not found' });
        return;
      }
      res.json(note);
    } catch (err) {
      res.status(500).json({ msg: 'Could not fetch note' });
    }
  }

  static async searchNotesByTitleOrTags(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ msg: 'User not authenticated' });
        return;
      }

      const { query } = req.query;
      const regex = new RegExp(query as string, 'i');
      const notes = await Note.find({
        user: req.user.id,
        $or: [
          { title: regex },
          { tags: regex }
        ]
      });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ msg: 'Search failed' });
    }
  }
}
export default NotesController;