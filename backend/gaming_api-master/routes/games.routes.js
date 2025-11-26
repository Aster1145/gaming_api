const express = require('express');
const gamesRouter = express.Router();
const Gaming = require('../models/gaming.model')


//GET all 
gamesRouter.get('/all',async (req,res) => {
    try{
         const games = await Gaming.find({}) ;
        res.status(200).json(games);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//POST create new user 
gamesRouter.post('/create-score',async (req,res) => {
  try{
    const Game =  await Gaming.create(req.body);
    res.status(200).json(Game);

  }catch(err){
    res.status(500).json( {message: err.message});
  }
});

//Get score of Player using user_id(GET)
gamesRouter.get('/find/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const game = await Gaming.findOne({user_id: user_id});

    if (!game) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


gamesRouter.put('/score/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;  
        const { score } = req.body;
        const updatedGame = await Gaming.findOneAndUpdate({user_id : user_id}, {score : score}, { new: true });

        if (!updatedGame) {
            return res.status(404).json({ message: 'Score is not updated' });
        }   
        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

gamesRouter.put('/level/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const { level } = req.body;

        const updatedGame = await Gaming.findOneAndUpdate(
            { user_id: user_id },  // search by user_id field
            { level: level },      // update level
            { new: true }
        );

        if (!updatedGame) {
            return res.status(404).json({ message: 'Level not updated, user not found' });
        }

        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

gamesRouter.delete('/delete/:user_id', async (req, res)=> {
  try{
    const { user_id} = req.params;
    const deletedGame = await Gaming.findOneAndDelete({
      user_id : user_id
    });
    if(!deletedGame){
      return res.status(404).json({message: "Game record not found"});
    }
    res.status(200).json({message: "Game record deleted successfully"});
   }catch (err){
    res.status(500).json({message: err.message});
   }
});
module.exports = gamesRouter;