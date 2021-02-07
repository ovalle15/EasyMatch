const express = require('express');
const TreeController = require('../controllers/tree-controller')

const router = express.Router();

router.get('/trees', TreeController.getTrees);
router.get('/treedb/:id', TreeController.getTreeById);
router.post('/treedb', TreeController.createTree);
router.put('/treedb/:id', TreeController.updateTree);
router.delete('/treedb/:id', TreeController.deleteTree);

module.exports = router;