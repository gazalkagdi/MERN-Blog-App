import userRoutes from './routes/user.route.js';

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

app.use('/api/user', userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})