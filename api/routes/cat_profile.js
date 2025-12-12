const express = require('express');
const router = express.Router();
const db = require('../index.js').db;
const queries = require('../queries');

// Cat detail
router.get('/cat/get', async (req, res) => {
  try {
    const { uid, name } = req.query;
    const [results] = await db.query(queries.readCatQuery, [uid, name]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Diet plans
router.post('/diet-plan/create', async (req, res) => {
  try {
    const { uid, cname, feeding_interval, feeding_portion, description } = req.body;
    await db.query(queries.createDietPlanQuery, [uid, cname, feeding_interval, feeding_portion, description]);
    res.status(201).json({ message: 'Diet plan created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/diet-plan/delete', async (req, res) => {
  try {
    const { uid, cname, dp_number } = req.body;
    await db.query(queries.deleteDietPlanQuery, [uid, cname, dp_number]);
    res.status(200).json({ message: 'Diet plan deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/diet-plan/list', async (req, res) => {
  try {
    const { uid, cname } = req.query;
    const [results] = await db.query(queries.readAllDietPlansQuery, [uid, cname]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/diet-plan/get', async (req, res) => {
  try {
    const { dp_number } = req.query;
    const [results] = await db.query(queries.readDietPlanQuery, [dp_number]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/diet-plan/update', async (req, res) => {
  try {
    const { feeding_interval, feeding_portion, description, dp_number } = req.body;
    await db.query(queries.updateDietPlanQuery, [feeding_interval, feeding_portion, description, dp_number]);
    res.status(200).json({ message: 'Diet plan updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Diet plan foods (Referenced_In)
router.post('/diet-plan/add-food', async (req, res) => {
  try {
    const { uid, cname, dp_number, fid } = req.body;
    await db.query(queries.addFoodToPlanQuery, [uid, cname, dp_number, fid]);
    res.status(201).json({ message: 'Food added to diet plan successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/diet-plan/remove-food', async (req, res) => {
  try {
    const { uid, dp_number, fid } = req.body;
    await db.query(queries.removeFoodFromPlanQuery, [uid, dp_number, fid]);
    res.status(200).json({ message: 'Food removed from diet plan successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/diet-plan/get-foods', async (req, res) => {
  try {
    const { uid, dp_number } = req.query;
    const [results] = await db.query(queries.readPlanFoodsQuery, [uid, dp_number]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Feeds
router.post('/feeds/create', async (req, res) => {
  try {
    const { uid, cname, fid, feed_date, feed_time } = req.body;
    await db.query(queries.createFeedQuery, [uid, cname, fid, feed_date, feed_time]);
    res.status(201).json({ message: 'Feed entry created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/feeds/delete', async (req, res) => {
  try {
    const { uid, cname, fid, feed_date, feed_time } = req.body;
    await db.query(queries.deleteFeedQuery, [uid, cname, fid, feed_date, feed_time]);
    res.status(200).json({ message: 'Feed entry deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/feeds/list', async (req, res) => {
  try {
    const { uid, cname } = req.query;
    const [results] = await db.query(queries.readCatFeedsQuery, [uid, cname]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Cat problems
router.post('/cat-problem/create', async (req, res) => {
  try {
    const { uid, cname, pname, diagnosis_date, severity, description } = req.body;
    await db.query(queries.createCatProblemQuery, [uid, cname, pname, diagnosis_date, severity, description]);
    res.status(201).json({ message: 'Cat problem created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/cat-problem/delete', async (req, res) => {
  try {
    const { uid, cname, pname } = req.body;
    await db.query(queries.deleteCatProblemQuery, [uid, cname, pname]);
    res.status(200).json({ message: 'Cat problem deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/cat-problem/list', async (req, res) => {
  try {
    const { uid, cname } = req.query;
    const [results] = await db.query(queries.readAllCatProblemsQuery, [uid, cname]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/cat-problem/get', async (req, res) => {
  try {
    const { uid, cname, pname } = req.query;
    const [results] = await db.query(queries.readCatProblemQuery, [uid, cname, pname]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/cat-problem/update', async (req, res) => {
  try {
    const { severity, description, uid, cname, pname } = req.body;
    await db.query(queries.updateCatProblemQuery, [severity, description, uid, cname, pname]);
    res.status(200).json({ message: 'Cat problem updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Medicinal problems (for site managers)
router.post('/med-problem/create', async (req, res) => {
  try {
    const { Mname, description } = req.body;
    await db.query(queries.createMedProblemQuery, [Mname, description]);
    res.status(201).json({ message: 'Medicinal problem created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/med-problem/delete', async (req, res) => {
  try {
    const { Mname } = req.body;
    await db.query(queries.deleteMedProblemQuery, [Mname]);
    res.status(200).json({ message: 'Medicinal problem deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/med-problem/search', async (req, res) => {
  try {
    const { query } = req.query;
    const [results] = await db.query(queries.findMedProblemQuery, [query]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/med-problem/get', async (req, res) => {
  try {
    const { Mname } = req.query;
    const [results] = await db.query(queries.readMedProblemQuery, [Mname]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/med-problem/list', async (_req, res) => {
  try {
    const [results] = await db.query(queries.readAllMedProblemsQuery);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/med-problem/update', async (req, res) => {
  try {
    const { description, Mname } = req.body;
    await db.query(queries.updateMedProblemQuery, [description, Mname]);
    res.status(200).json({ message: 'Medicinal problem updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Site manager
router.get('/site-manager/check', async (req, res) => {
  try {
    const { uid } = req.query;
    const [results] = await db.query(queries.checkSiteManagerQuery, [uid]);
    res.status(200).json({ isSiteManager: results.length > 0 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Food
router.post('/food/create', async (req, res) => {
  try {
    const { brand, name, type, calories, carbs, protein, fat } = req.body;
    await db.query(queries.createFoodQuery, [null, brand, name, type, calories, carbs, protein, fat]);
    res.status(201).json({ message: 'Food created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/food/delete', async (req, res) => {
  try {
    const { fid } = req.body;
    await db.query(queries.deleteFoodQuery, [fid]);
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/food/get-by-id', async (req, res) => {
  try {
    const { fid } = req.query;
    const [results] = await db.query(queries.readFoodIdQuery, [fid]);
    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/food/get-by-name', async (req, res) => {
  try {
    const { name } = req.query;
    const [results] = await db.query(queries.readFoodNameQuery, [name]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/food/update', async (req, res) => {
  try {
    const { brand, name, type, calories, carbs, protein, fat, fid } = req.body;
    await db.query(queries.updateFoodQuery, [brand, name, type, calories, carbs, protein, fat, fid]);
    res.status(200).json({ message: 'Food updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/food/list', async (_req, res) => {
  try {
    const [results] = await db.query(queries.readAllFoodsQuery);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Nutrition aggregate
router.get('/nutritional-intake', async (req, res) => {
  try {
    const { uid, cname } = req.query;
    if (!uid || !cname) return res.status(400).json({ error: 'Missing required parameters: uid, cname' });
    const [results] = await db.query(queries.avgNutritionQuery, [uid, cname]);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: 'Query failed', details: e.message });
  }
});

module.exports = router;
