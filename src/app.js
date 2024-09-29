import express from "express";
const app = express();
import userRoutes from './routes/user.route.js'
import cors from 'cors';



app.use(cors())
app.use(express.json());
app.use('/user', userRoutes);

export { app };
