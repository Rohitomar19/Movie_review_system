import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import profileRouter from './routes/profile.js';
import movieRouter from './routes/movie.js';
import { handleConnect } from './connection.js';
import { checkUser } from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: true,
  credentials: true
}));

handleConnect();

app.use('/api/user', userRouter);
app.use('/api/profile', checkUser, profileRouter);
app.use('/api/movie', movieRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
