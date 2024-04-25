import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Database Connected!');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})