const CarModel = require('../models/Car');

// Get car by ID
const getCarById = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id); // Removed populate('trips')
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.find(); // Removed populate('trips')
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new car
const createCar = async (req, res) => {
  const { license, name, brand, capacity, driverName } = req.body;

  const car = new CarModel({
    license,
    name,
    brand,
    capacity,
    driverName
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update car by ID
const updateCarById = async (req, res) => {
  const { license, name, brand, capacity, driverName } = req.body;

  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update car fields
    car.license = license || car.license;
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.capacity = capacity || car.capacity;
    car.driverName = driverName || car.driverName;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car by ID
const deleteCarById = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all cars
const deleteAllCars = async (req, res) => {
  try {
    await CarModel.deleteMany(); // Delete all cars
    res.json({ message: 'All cars deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCarById,
  getAllCars,
  createCar,
  updateCarById,
  deleteCarById,
  deleteAllCars,
};
