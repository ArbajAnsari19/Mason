import { Request, Response } from 'express';
import {User} from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


export class UserController {

    static async signup (req: Request, res: Response) : Promise<void>{
        try {
            const { username, email, password } = req.body;
        
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              res.status(400).json({ message: 'User already exists' });
          }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
        
             res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ message: 'Server error during signup' });
          }
    }

    static async login (req: Request, res: Response) : Promise<void> {
      try {
          const { email, password } = req.body;
          console.log('Login request:',  email, password);
          const user = await User.findOne({ email });
          if (!user) {
             res.status(400).json({ message: 'Invalid credentials' });
             return;
          }
          console.log('Stored hashed password:', user.password);
          console.log('Attempting to compare with provided password');
          
          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log('Password comparison details:', {
              providedPassword: password,
              isValid: isPasswordValid
          });
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
          console.log('Token generated:', token);
          const isFirstLogin = user.isFirstLogin;
          if (isFirstLogin) {
            await User.findByIdAndUpdate(user._id, { isFirstLogin: false });
          }
          res.status(200).json({
            token,
            user: {
              id: user._id,
              email: user.email,
              name: user.username,
              isFirstLogin
            }
          });
        } catch (error) {
          console.error('Login error:', error);
          res.status(500).json({ message: 'Server error during login' });
        }
    }

    static async firstLoginUpdate (req: Request, res: Response) : Promise<void> {
        try {
            const { userId } = req.params;

        
            const user = await User.findById(userId);
            if (!user) {
              res.status(404).json({ message: 'User not found' });
              return;
            }
        
            user.isFirstLogin = false;
            await user.save();
        
            res.status(200).json({ message: 'User updated successfully' });
          } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Server error during update' });
          }
    }
}


export default UserController;