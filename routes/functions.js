const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

const products = [
  {
    id: 1,
    name: 'Do some code'
  }
];


app.set('port', process.env.PORT || 8015);


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  products.push({
    id: products.length + 1,
    name
  });
  res.json('Successfully created');
});

app.put('/products/:id', (req, res) => {
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

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  products.forEach((product, i) => {
    if(product.id == id) {
      products.splice(i, 1);
    }
  });
  res.json('Successfully deleted');
});


app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});