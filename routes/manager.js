const express = require('express');
const Customer = require('../models/customerSchema.cjs');

const router = express.Router();

// Retrieve all users
router.get('/user', async (req, res) => {
  try {
    const users = await Customer.find();
    res.render('manager', { users });  // Pass the users to the Pug template
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
