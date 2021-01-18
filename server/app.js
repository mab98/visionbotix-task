import express from "express";
import mongoose from "mongoose";

import Post from './models/postModel.js';
import router from './routes/postRoute.js';

// App Configuration
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://blogpostuser:blogpostuser123@cluster0.jkam3.mongodb.net/<dbname>?retryWrites=true&w=majority"

// Middlewares
app.use(express.json()); // to parse incoming requests, acting as middleware
app.use(router);

// DB Configuration
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongodb Connection Established !');
});

mongoose.connection.on('error', (err) => {
  console.log('error: ', err);
});

// Listener
app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
