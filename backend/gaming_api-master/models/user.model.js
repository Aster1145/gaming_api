const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the User Name"],
        trim:true,
        maxLength: [50, "Name cannot exceed 50 characters"],
        default : null,
    },

    email: {
        type: String,
        required: [true, "Please Enter the Email"],
        unique: true,
        default : null,
    },

    password: {
        type: String,
        required: [true, "Please Enter the Password"],
        minlength: [6, "Password should be at least 6 characters"],
    },

    country: {
      type: String,
      default: "Unknown",
    },

    level: {
      type: Number,
      default: 1,
    },

    age: {
      type:Number,
      default: 0
    },

    achievements: [
      {
        title: String,
        description: String,
        unlockedAt: { type: Date, default: Date.now },
      },
    ],

    joinedAt: {
      type: Date,
      default: Date.now,
    },

},{ timestamps:true });
const User = mongoose.model("User", Userschema);

module.exports = User;