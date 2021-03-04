
const express = require('express');
const TreeController = require('../controllers/tree-controller')

const router = express.Router();

router.get('/trees',  TreeController.getTrees);
router.get('/tree/:id', TreeController.getTreeById);
router.post('/tree', TreeController.createTree);
router.put('/tree/:id', TreeController.updateTree);
router.delete('/tree/:id', TreeController.deleteTree);

module.exports = router;