const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt to scramble passwords

// Define the blueprint for what a "User" looks like in our database
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // This field is mandatory
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Student', 'Investor'], // Only allows these two values
        default: 'Student'
    },
    // We add a timestamp to know when they joined the waitlist
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// -- SECURITY: HASHING PASSWORD BEFORE SAVING --
// This function runs automatically *before* ('save') a user is saved to the DB
userSchema.pre('save', async function (next) {
    // If the password hasn't been changed, skip this step
    if (!this.isModified('password')) {
        next();
    }

    // Generate a "salt" (random data to make the hash unique)
    const salt = await bcrypt.genSalt(10);
    
    // Replace the plain text password with the hashed (scrambled) version
    this.password = await bcrypt.hash(this.password, salt);
});

// Export the model so we can use it to Create, Read, Update, or Delete users
module.exports = mongoose.model('User', userSchema);