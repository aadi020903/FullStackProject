let dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
const {connectDB }=require('./Database/dbconnection');
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
app.get('/', (req, res) => {
    res.send('Hello World');
    })

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
});