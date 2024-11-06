const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    buyer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    items: [{
      book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
      } 
    }],
    totalPrice: { 
        type: Number, 
        required: true 
      },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Cart = mongoose.model('Cart', cartSchema,'Cart');
  module.exports = Cart;
  