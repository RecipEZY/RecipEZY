const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  //groceryList: {itemSchema}
  groceryList: [{
    ingredient: String,
    quantity: Number,
    price: Number,
  }]
  });



const User = mongoose.model('user', userSchema)


module.exports = User;