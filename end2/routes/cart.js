const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  cart.push({ productId, quantity });
  res.json({ message: 'Added to cart' });
});

router.post('/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
