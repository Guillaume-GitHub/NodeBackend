const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// POST ROUTE
router.post(('/'), stuffCtrl.createThing);
// GET ROUTE ID
router.get(('/:id'), stuffCtrl.getOneThing);
// GET ROUTE
router.get(('/'), stuffCtrl.getAllThing);
// PUT ROUTE ID
router.put(('/:id'), stuffCtrl.modifyThing);
// DELETE ROUTE ID
router.delete(('/:id'), stuffCtrl.deleteThing);

module.exports = router;