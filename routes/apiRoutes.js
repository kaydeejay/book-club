const express = require('express');
const router = express.Router();
const bookController = require('../models/controllers/bookDB.controller');

// root directory == /api
router.get('/', function (req, res, next) {
  res.json({ success: true, kevinSays: 'You took a wrong turn somewhere, buddy.' });
});

// create:
router.post('/books/new', bookController.addBook);

// read:
router.get('/books/:id', bookController.findById);
router.get('/books', bookController.findAll);

// update:
router.put('/books/update', bookController.markRead);

// delete:
router.delete('/books/delete/:id', bookController.deleteById);

module.exports = router;
