const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    buyer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    books: [{
      book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
      } 

    }],
    totalAmount: {
      type: Number, 
      required: true
    },
    totalPrice: { 
        type: Number, 
        required: true 
      },
    status: {
      type: String,
      enum: ['pending', 'completed', 'shipped', 'cancelled'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Order = mongoose.model('Order', orderSchema,'Order');
  module.exports = Order;