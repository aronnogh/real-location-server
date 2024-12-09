// server/models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  license: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  driverName: { type: String, required: true },
  brand: { type: String, required: true },
  capacity: { type: String, required: true },

});

// const CarModel = mongoose.model('Car', carSchema);
const CarModel = mongoose.models.Car || mongoose.model('Car', carSchema);

module.exports = CarModel;
