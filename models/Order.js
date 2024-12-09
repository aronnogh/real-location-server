// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  license: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  driverName: { type: String, required: true },
  brand: { type: String, required: true },
  capacity: { type: String, required: true },

});

// const CarModel = mongoose.model('Car', carSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
