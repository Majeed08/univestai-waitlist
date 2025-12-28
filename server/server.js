// 1. IMPORT DEPENDENCIES
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');
const User = require('./models/User'); // Import our User model

// 2. CONFIGURATION
dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB

const app = express(); // Initialize the Express app

// 3. MIDDLEWARE (The Gatekeepers)
// Allows our app to accept JSON data (like form submissions)
app.use(express.json()); 
// Allows cross-origin requests (good for development)
app.use(cors()); 

// 4. SERVE STATIC FILES (THE FRONTEND)
// This tells Express: "Look in the 'public' folder for HTML, CSS, and JS files"
// When someone visits your website URL, they will see index.html automatically.
app.use(express.static(path.join(__dirname, '../public')));

// 5. API ROUTES (The Action Handlers)

// Route: Register a new user
// Method: POST (Sending data to server)
// Endpoint: /api/register
app.post('/api/register', async (req, res) => {
    try {
        // Destructure data sent from the frontend
        const { fullName, email, password, userType } = req.body;

        // Validation: Check if all fields are present
        if (!fullName || !email || !password || !userType) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        // Note: We don't manually hash the password here because...
        // ...our User.js model does it automatically with the 'pre-save' hook!
        const user = await User.create({
            fullName,
            email,
            password,
            userType
        });

        // Send success response back to frontend
        if (user) {
            res.status(201).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                message: 'Registration successful!'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// 6. START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});