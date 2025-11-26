const express = require('express');
const userRouter = express.Router();
const User = require("../models/user.model.js");


//Create User (POST)
userRouter.post('/create',async (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
            
    }catch (e) {
        if (e.name === 'ValidationError') {
            const messages = Object.values(e.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: e.message });
    }
});

//Get All Users(GET)
userRouter.get('/all',async (req, res) =>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//Get user by ID(GET)
userRouter.get('/:id',async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message : "User not Found"});
        }
        res.status(200).json(user);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Update Country by User ID(PUT)
userRouter.put('/country/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { country } = req.body;

        if (!country) {
            return res.status(400).json({ message: "Country is required" });
        }

        const result = await User.updateOne(
            { _id: id },
            { $set: { country: country } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//Update Age by User ID(PUT)
userRouter.put('/age/:id', async (req, res)=> {
    try {
        const { id}  = req.params;
        const { age } = req.body;
        if(!age){
            return res.status(400).json({message: "Age is required"});
        }

        const updateAge = await User.findByIdAndUpdate(
            id,
            { age },
            { new: true, runValidators: true }
        );

        if(updateAge.matchedCount === 0){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(updateAge);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
})


userRouter.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message: "User not Found"});
        }
        res.status(200).json(deletedUser);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});


module.exports = userRouter;