const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const authRouter = require('./routers/authRouter');
const testsRouter = require('./routers/testsRouter');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/tests', testsRouter);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

const start = async () => {
  await connectToDatabase();
  startServer();
};

start();
