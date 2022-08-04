const router = require('express').Router();


router.get('/:id', (req, res) => {
  res.send('Hello, User');
});

module.exports = router;
