import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import listingRouter from './routes/listing.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

const app = express();

// Access your MongoDB URI from the environment variables
const mongoUri = process.env.MONGO_URI; 
if (!mongoUri) {
    console.error("MONGO_URI is not defined. Please check your .env file.");
    process.exit(1); // Exit if MONGO_URI is not set
}

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
