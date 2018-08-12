const router = require('express').Router();
// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'To do List'});
});

module.exports = router;
