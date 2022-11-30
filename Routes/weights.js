const express = require('express');
const router = express.Router();
const weightsController = require('../Controllers/weightsController');
const verifyJWT = require('../Middleware/verifyJWT');

router.use(verifyJWT)
router.route('/')
.get( weightsController.getUserWeights)
.post(weightsController.addWeights)
.delete( weightsController.deleteAllWeights);

module.exports = router;