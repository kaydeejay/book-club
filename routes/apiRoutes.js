const express = require('express');
const router = express.Router();
const bookController = require('../models/controllers/bookDB.controller');

// root directory == /api
router.get('/', function (req, res, next) {
  res.json({ success: true, kevinSays: 'You took a wrong turn somewhere, buddy.' });
});

// create:
router.post('/new-book', bookController.addBook);

// read:
router.get('/books/:id', bookController.findById);
router.get('/books', bookController.findAll);

// update:
router.put('/update-read', bookController.markRead);

// delete:
router.delete('/delete/:id', bookController.deleteById);

module.exports = router;
