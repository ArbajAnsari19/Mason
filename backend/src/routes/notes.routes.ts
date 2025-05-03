import express from 'express';
import NotesController from '../controllers/notes.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.post('/',authenticate, NotesController.createNote);
router.get('/', authenticate,NotesController.getNotes);
router.get('/search',authenticate, NotesController.searchNotes);
router.get('/:id',authenticate, NotesController.getNote);
router.put('/:id',authenticate, NotesController.updateNote);
router.delete('/:id',authenticate, NotesController.deleteNote);

export default router;
