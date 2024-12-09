const DriverModel = require('../models/Drivermodel');

// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id); // Removed populate('trips')
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find(); // Removed populate('trips')
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new driver
const createDriver = async (req, res) => {
  const {license,
    driverName,
    username,
    password,
    carName,
    carNumber,
    lat,
    lng,
    totalTripToday,
    totalTripOverAll } = req.body;

  const driver = new DriverModel({
    license,
    driverName,
    username,
    password,
    carName,
    carNumber,
    lat,
    lng,
    totalTripToday,
    totalTripOverAll
  });

  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update driver by ID
const updateDriverById = async (req, res) => {
  const { license,
    driverName,
    username,
    password,
    carName,
    carNumber,
    lat,
    lng,
    totalTripToday,
    totalTripOverAll } = req.body;

  try {
    const driver = await DriverModel.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Update driver fields
    driver.license = license || driver.license;
    driver.driverName = driverName || driver.driverName;
    driver.username = username || driver.username;
    driver.password = password || driver.password;
    driver.carName = carName || driver.carName;
    driver.carNumber = carNumber || driver.carNumber;
    driver.lat = lat || driver.lat;
    driver.lng = lng || driver.lng;
    driver.lat = lat || driver.lat;
    driver.totalTripToday = totalTripToday || driver.totalTripToday;
    driver.totalTripOverAll = totalTripOverAll || driver.totalTripOverAll;

    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete driver by ID
const deleteDriverById = async (req, res) => {
  try {
    const driver = await DriverModel.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all drivers
const deleteAllDrivers = async (req, res) => {
  try {
    await DriverModel.deleteMany(); // Delete all drivers
    res.json({ message: 'All drivers deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDriverById,
  getAllDrivers,
  createDriver,
  updateDriverById,
  deleteDriverById,
  deleteAllDrivers,
};
