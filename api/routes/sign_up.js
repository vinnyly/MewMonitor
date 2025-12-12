const express = require('express');
const router = express.Router();
const db = require('../index.js').db;
const queries = require('../queries');

// Create User
router.post('/user/create', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    await db.query(queries.createUserQuery, [name, email, phone, password]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete User
router.delete('/user/delete', async (req, res) => {
  try {
    const { uid } = req.body;
    await db.query(queries.deleteUserQuery, [uid]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Read User Profile
router.get('/user/profile', async (req, res) => {
  try {
    const { uid } = req.query;
    const [results] = await db.query(queries.readUserProfileQuery, [uid]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update User
router.put('/user/update', async (req, res) => {
  try {
    const { name, email, phone, password, num_cats, uid } = req.body;
    await db.query(queries.updateUserQuery, [name, email, phone, password, num_cats, uid]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
