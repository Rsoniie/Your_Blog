import express from "express";
const app = express();
import userRoutes from './routes/user.route.js'

app.use(express.json());
app.use('/user', userRoutes);

export { app };
