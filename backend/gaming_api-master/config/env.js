const dotenv = require('dotenv');

dotenv.config( {path: `.env.${process.env.NODE_ENV || 'development'}.local`})

module.exports = {
  PORT: Number(process.env.PORT) || 3000 ,
  MONGODB_URI: process.env.MONGODB_URI,
};