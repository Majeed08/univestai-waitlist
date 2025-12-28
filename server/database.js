// Import the mongoose library to manage database interactions
const mongoose = require('mongoose');

// This function connects our application to the MongoDB Cloud Database
const connectDB = async () => {
    try {
        // Attempt to connect using the URI stored in our .env file
        // We use 'process.env.MONGO_URI' to access the secret variable
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If successful, log the host name to the console so we know it worked
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If the connection fails (e.g., bad internet, wrong password), log the error
        console.error(`❌ Error: ${error.message}`);
        
        // Stop the application immediately if the database fails (1 means failure)
        process.exit(1);
    }
};

// Export the function so we can use it in our main server file
module.exports = connectDB;