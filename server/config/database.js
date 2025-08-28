// db.js
import mongoose from "mongoose";

// Connection URI. Replace 'todoapp' with your desired database name
const mongoURI = "mongodb://localhost:27017/todoapp";

// Function to connect to the database
const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise, so we await it
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");

    // Get the default connection
    const db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
