const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '.env' });
const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const testsRouter = require('./routers/testsRouter');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use('/auth', authRouter);
app.use('/tests', testsRouter);
app.use('/users', usersRouter);

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
