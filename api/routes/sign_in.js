const express = require('express');
const router = express.Router();
const db = require('../index.js').db;
const queries = require('../queries');

router.get('/', async (_req, res) => {
  res.status(200).json({ message: 'Sign in endpoint ready' });
});

router.get('/profile', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: 'User ID is required' });

    const [results] = await db.query(queries.readUserProfileQuery, [uid]);
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({ name: results[0].name });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error fetching user profile', details: e.message });
  }
});

router.post('/form', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const [results] = await db.query(queries.loginQuery, [email]);
    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful', uid: results[0].uid });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error during login', details: e.message });
  }
});

module.exports = router;