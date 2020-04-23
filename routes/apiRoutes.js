const express = require('express');
const router = express.Router();
const axios = require('axios');
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

// search google books
router.put('/search', (req, res) => {
  const { url } = req.body;
  console.log(url + process.env.GBOOKS_API_KEY);
  axios.get(url + process.env.GBOOKS_API_KEY)
    .then(result => {
      res.json(result.data.items);
    })
    .catch(err => console.log(err));
})

module.exports = router;
