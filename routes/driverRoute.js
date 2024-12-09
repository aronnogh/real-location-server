// driverRoutes.js
const express = require('express');
const { getDriverById, getAllDrivers, createDriver, updateDriverById, deleteDriverById, deleteAllDrivers } = require('../controllers/driverControllers');
const router = express.Router();

// Routes for drivers
router.get('/', getAllDrivers);  // This will be mapped to /api/drivers/
router.get('/:id', getDriverById);  // This will be mapped to /api/drivers/:id
router.post('/', createDriver);  // This will be mapped to /api/drivers/
router.put('/update/:id', updateDriverById);  // This will be mapped to /api/drivers/update/:id
router.delete('/delete/:id', deleteDriverById);  // This will be mapped to /api/drivers/delete/:id
router.delete('/deleteall', deleteAllDrivers);  // This will be mapped to /api/drivers/deleteall

module.exports = router;
