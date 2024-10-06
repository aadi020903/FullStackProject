import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './Database/dbconnection.js';
import Router from './src/routes/user_route.js';
const app = express();
app.use(express.json());

connectDB();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: ["http://localhost:5173"], // Allow requests from example1.com and example2.com
    methods: 'GET,POST', // Allow only GET and POST requests
      credentials: true,
    allowedHeaders: 'Content-Type,Authorization', // Allow only specific headers
  };
  // Handle CORS preflight requests
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));



// Routes
app.use('/api/v1/user', Router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.HOST+process.env.PORT}`);
});