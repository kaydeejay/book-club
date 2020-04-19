var express = require('express');
var router = express.Router();

// root directory == /api
router.get('/', function (req, res, next) {
  res.json({ success: true, kevin: 'is so good at this' });
});

module.exports = router;
