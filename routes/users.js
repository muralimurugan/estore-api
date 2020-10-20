const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');
router.post('/register', userController.create);
router.post('/login', userController.authenticate);
router.get('/:storeId', userController.getUsersByStoreId);

module.exports = router;