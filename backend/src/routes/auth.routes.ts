import express from 'express';
import  UserController  from '../controllers/auth.controller';
// import { authenticate } from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/signup' , UserController.signup);
router.post('/login', UserController.login);
router.put('/firstLogin/:userId', UserController.firstLoginUpdate);


export default router;
