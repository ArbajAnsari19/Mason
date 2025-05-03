import  connectDB  from './config/db';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import notesRoutes from './routes/notes.routes';

const app = express();
dotenv.config();

app.use(cors(
  {
    origin: 'http://localhost:8080', 
    credentials: true,
  }
));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('API is running Arbaj...');
}
);
app.use('/api/notes', notesRoutes);

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
