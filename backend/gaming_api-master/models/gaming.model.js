const mongoose = require('mongoose');

const Gamingschema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User ID is required"]
        },

        score : {
            type: Number,
            default : 0,
            min : [0, "Score cannot be negative"]
        },

        games_name : {
            type: String,
            required: [true, "Please Enter the Game Name"],
            default : null,
        },

        level: {
            type: Number,
            default: 1,
            min: [1, "Level cannot be less than 1"]
        },
    },{
        timestamps:true,
    }
);

const Gaming = mongoose.model("Gaming Score", Gamingschema);

module.exports = Gaming;