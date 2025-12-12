const express = require('express');
const router = express.Router();
const db = require('../index.js').db;
const queries = require('../queries');

// Cats
router.post('/cat/create', async (req, res) => {
  try {
    const { uid, name, breed, age, weight, gender } = req.body;
    await db.query(queries.createCatQuery, [uid, name, breed, age, weight, gender]);
    res.status(201).json({ message: 'Cat created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/cat/delete', async (req, res) => {
  try {
    const { uid, name } = req.body;
    await db.query(queries.deleteCatQuery, [uid, name]);
    res.status(200).json({ message: 'Cat deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/cat/list', async (req, res) => {
  try {
    const { uid } = req.query;
    const [results] = await db.query(queries.readUserCatsQuery, [uid]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/cat/update', async (req, res) => {
  try {
    const { uid, name, newName, weight, breed, age, gender } = req.body;
    const updatedName = newName || name;
    await db.query(queries.updateCatQuery, [updatedName, weight, breed, age, gender, uid, name]);
    res.status(200).json({ message: 'Cat updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Aggregates / lookups for homepage
router.get('/diagnosis-plans', async (req, res) => {
  try {
    const { uid, condition } = req.query;
    if (!uid || !condition) return res.status(400).json({ error: 'Missing required parameters: uid, condition' });
    const [results] = await db.query(queries.diagnosisPlanQuery, [uid, condition]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: 'Query failed', details: e.message });
  }
});

router.get('/conditions-by-age', async (req, res) => {
  try {
    const { age } = req.query;
    if (!age) return res.status(400).json({ error: 'Missing required parameter: age' });
    const [results] = await db.query(queries.conditionsByAgeQuery, [age]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: 'Query failed', details: e.message });
  }
});

router.get('/popular-food', async (req, res) => {
  try {
    const { condition } = req.query;
    if (!condition) return res.status(400).json({ error: 'Missing required parameter: condition' });
    const [results] = await db.query(queries.popularFoodQuery, [condition]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: 'Query failed', details: e.message });
  }
});

module.exports = router;
