const router = require('express').Router();
const products = require('../products');

// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'To do List'});
});

router.get('/products', (req, res) => {
  console.log('aqui estan los productos')
  res.json(products);
});

router.post('/products', (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  products.push({
    id: products.length + 1,
    name
  });
  res.json('Successfully created');
});

router.put('/products/:id', (req, res) => {
  console.log(req.body, req.params)
  const { id } = req.params;
  const { name } = req.body;

  products.forEach((product, i) => {
    if (product.id == id) {
      product.name = name;
    }
  });
  res.json('Successfully updated');

});

router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  products.forEach((product, i) => {
    if(product.id == id) {
      products.splice(i, 1);
    }
  });
  res.json('Successfully deleted');
});



module.exports = router;
