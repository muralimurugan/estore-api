const express = require('express');
const router = express.Router();
const storeController = require('../api/controllers/stores')

router.get('/', storeController.getAll);
router.post('/', storeController.create);
router.put('/:storeId', storeController.updateById);
router.get('/:storeId', storeController.getById);
router.delete('/:storeId', storeController.deleteById);

module.exports = router;