//TODO: temporary js file to put routes. sort them to appropriate pages later.

const express = require('express');
const router = express.Router();
const db = require('../index.js').db; // Import the database connection

const fs = require('fs');           // File system tool to read files
const path = require('path');       // Path tool to handle file paths
const SQL_PATH = require('../index.js').SQL_PATH; // import SQL folder path

// --- PRE-LOAD COMPLEX QUERIES ---
const avgNutritionQuery = fs.readFileSync(path.join(SQL_PATH, 'complex_queries(READS)/average_daily_nutritional_intake.sql'), 'utf8');
const diagnosisPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'complex_queries(READS)/cat_diagnosis_plan.sql'), 'utf8');
const conditionsByAgeQuery = fs.readFileSync(path.join(SQL_PATH, 'complex_queries(READS)/conditions_by_age.sql'), 'utf8');
const popularFoodQuery = fs.readFileSync(path.join(SQL_PATH, 'complex_queries(READS)/popular_food_for_condition.sql'), 'utf8');

// --- PRE-LOAD USER QUERIES ---
const createUserQuery = fs.readFileSync(path.join(SQL_PATH, 'user/create_user.sql'), 'utf8');
const deleteUserQuery = fs.readFileSync(path.join(SQL_PATH, 'user/delete_user.sql'), 'utf8');
const readUserProfileQuery = fs.readFileSync(path.join(SQL_PATH, 'user/read_user_profile.sql'), 'utf8');
const updateUserQuery = fs.readFileSync(path.join(SQL_PATH, 'user/update_user.sql'), 'utf8');

// --- PRE-LOAD CAT QUERIES ---
const createCatQuery = fs.readFileSync(path.join(SQL_PATH, 'cat/create_cat.sql'), 'utf8');
const deleteCatQuery = fs.readFileSync(path.join(SQL_PATH, 'cat/delete_cat.sql'), 'utf8');
const readCatQuery = fs.readFileSync(path.join(SQL_PATH, 'cat/read_cat.sql'), 'utf8');
const readUserCatsQuery = fs.readFileSync(path.join(SQL_PATH, 'cat/read_user_cats.sql'), 'utf8');
const updateCatQuery = fs.readFileSync(path.join(SQL_PATH, 'cat/update_cat.sql'), 'utf8');

// --- PRE-LOAD DIET PLAN QUERIES ---
const createDietPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'diet_plan/create_diet_plan.sql'), 'utf8');
const deleteDietPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'diet_plan/delete_diet_plan.sql'), 'utf8');
const readAllDietPlansQuery = fs.readFileSync(path.join(SQL_PATH, 'diet_plan/read_all_diet_plans.sql'), 'utf8');
const readDietPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'diet_plan/read_diet_plan.sql'), 'utf8');
const updateDietPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'diet_plan/update_diet.sql'), 'utf8');

// --- PRE-LOAD FOOD QUERIES ---
const createFoodQuery = fs.readFileSync(path.join(SQL_PATH, 'food/create_food.sql'), 'utf8');
const deleteFoodQuery = fs.readFileSync(path.join(SQL_PATH, 'food/delete_food.sql'), 'utf8');
const readFoodIdQuery = fs.readFileSync(path.join(SQL_PATH, 'food/read_food_from_id.sql'), 'utf8');
const readFoodNameQuery = fs.readFileSync(path.join(SQL_PATH, 'food/read_foods_from_name.sql'), 'utf8');
const updateFoodQuery = fs.readFileSync(path.join(SQL_PATH, 'food/update_food.sql'), 'utf8');

// --- PRE-LOAD FEEDS QUERIES ---
const createFeedQuery = fs.readFileSync(path.join(SQL_PATH, 'feeds/create_feeds.sql'), 'utf8');
const deleteFeedQuery = fs.readFileSync(path.join(SQL_PATH, 'feeds/delete_feeds.sql'), 'utf8');
const readCatFeedsQuery = fs.readFileSync(path.join(SQL_PATH, 'feeds/read_cat_feeds.sql'), 'utf8');

// --- PRE-LOAD CAT PROBLEM QUERIES ---
const createCatProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'cat_problem/create_cat_problem.sql'), 'utf8');
const deleteCatProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'cat_problem/delete_cat_problem.sql'), 'utf8');
const readAllCatProblemsQuery = fs.readFileSync(path.join(SQL_PATH, 'cat_problem/read_all_cat_problems.sql'), 'utf8');
const readCatProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'cat_problem/read_cat_problem.sql'), 'utf8');
const updateCatProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'cat_problem/update_cat_problem.sql'), 'utf8');

// --- PRE-LOAD REFERENCED_IN (DIET PLAN FOODS) QUERIES ---
const addFoodToPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'referenced_in/create_food_to_plan.sql'), 'utf8');
const removeFoodFromPlanQuery = fs.readFileSync(path.join(SQL_PATH, 'referenced_in/delete_reference.sql'), 'utf8');
const readPlanFoodsQuery = fs.readFileSync(path.join(SQL_PATH, 'referenced_in/read_food_plan.sql'), 'utf8');

// --- PRE-LOAD MEDICINAL PROBLEM QUERIES ---
const createMedProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/create_med_problem.sql'), 'utf8');
const deleteMedProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/delete_med_problem.sql'), 'utf8');
const findMedProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/find_med_problem.sql'), 'utf8');
const readMedProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/read_med_problem.sql'), 'utf8');
const updateMedProblemQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/update_med_problem.sql'), 'utf8');
const readAllMedProblemsQuery = fs.readFileSync(path.join(SQL_PATH, 'medicinal_problem/read_all_med_problems.sql'), 'utf8');

// --- PRE-LOAD SITE MANAGER QUERIES ---
const checkSiteManagerQuery = fs.readFileSync(path.join(SQL_PATH, 'site_manager/check_site_manager.sql'), 'utf8');

// --- PRE-LOAD ALL FOODS QUERY ---
const readAllFoodsQuery = fs.readFileSync(path.join(SQL_PATH, 'food/read_all_foods.sql'), 'utf8');



//temp test route
router.get('/testy', async (req, res) => {
    try {
        const [results] = await db.query(fs.readFileSync(path.join(SQL_PATH, 'init/temp.sql'), 'utf8'));
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// --- COMPLEX QUERY ROUTES ---

// 1. Average Daily Nutritional Intake for a Cat
// Usage: GET /api/temp/nutritional-intake?uid=1&cname=Fluffy
router.get('/nutritional-intake', async (req, res) => {
    try {
        const { uid, cname } = req.query;
        if (!uid || !cname) {
            return res.status(400).json({ error: 'Missing required parameters: uid, cname' });
        }
        const [results] = await db.query(avgNutritionQuery, [uid, cname]);
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Query failed', details: e.message });
    }
});

// 2. Cat Diagnosis Plan
// Usage: GET /api/temp/diagnosis-plans?uid=1&condition=Diabetes
router.get('/diagnosis-plans', async (req, res) => {
    try {
        const { uid, condition } = req.query;
        if (!uid || !condition) {
            return res.status(400).json({ error: 'Missing required parameters: uid, condition' });
        }
        const [results] = await db.query(diagnosisPlanQuery, [uid, condition]);
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Query failed', details: e.message });
    }
});

// 3. Conditions by Age
// Usage: GET /api/temp/conditions-by-age?age=5
router.get('/conditions-by-age', async (req, res) => {
    try {
        const { age } = req.query;
        if (!age) {
            return res.status(400).json({ error: 'Missing required parameter: age' });
        }
        const [results] = await db.query(conditionsByAgeQuery, [age]);
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Query failed', details: e.message });
    }
});

// 4. Popular Food for Condition
// Usage: GET /api/temp/popular-food?condition=Arthritis
router.get('/popular-food', async (req, res) => {
    try {
        const { condition } = req.query;
        if (!condition) {
            return res.status(400).json({ error: 'Missing required parameter: condition' });
        }
        const [results] = await db.query(popularFoodQuery, [condition]);
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Query failed', details: e.message });
    }
});

// ==========================================
//             USER ROUTES
// ==========================================

// Create User
router.post('/user/create', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        await db.query(createUserQuery, [name, email, phone, password]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete User
router.delete('/user/delete', async (req, res) => {
    try {
        const { uid } = req.body;
        await db.query(deleteUserQuery, [uid]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read User Profile
router.get('/user/profile', async (req, res) => {
    try {
        const { uid } = req.query;
        const [results] = await db.query(readUserProfileQuery, [uid]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update User
router.put('/user/update', async (req, res) => {
    try {
        const { name, email, phone, password, num_cats, uid } = req.body;
        await db.query(updateUserQuery, [name, email, phone, password, num_cats, uid]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//             CAT ROUTES
// ==========================================

// Create Cat
router.post('/cat/create', async (req, res) => {
    try {
        const { uid, name, breed, age, weight, gender } = req.body;
        await db.query(createCatQuery, [uid, name, breed, age, weight, gender]);
        res.status(201).json({ message: 'Cat created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Cat
router.delete('/cat/delete', async (req, res) => {
    try {
        const { uid, name } = req.body;
        await db.query(deleteCatQuery, [uid, name]);
        res.status(200).json({ message: 'Cat deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read One Cat
router.get('/cat/get', async (req, res) => {
    try {
        const { uid, name } = req.query;
        const [results] = await db.query(readCatQuery, [uid, name]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read All User Cats
router.get('/cat/list', async (req, res) => {
    try {
        const { uid } = req.query;
        const [results] = await db.query(readUserCatsQuery, [uid]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update Cat
router.put('/cat/update', async (req, res) => {
    try {
        const { uid, name, newName, weight, breed, age, gender } = req.body;
        // Use newName if provided, otherwise keep the same name
        const updatedName = newName || name;
        await db.query(updateCatQuery, [updatedName, weight, breed, age, gender, uid, name]);
        res.status(200).json({ message: 'Cat updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//             DIET PLAN ROUTES
// ==========================================

// Create Diet Plan
router.post('/diet-plan/create', async (req, res) => {
    try {
        const { uid, cname, feeding_interval, feeding_portion, description } = req.body;
        // dp_number is auto-increment, handled by DB
        await db.query(createDietPlanQuery, [uid, cname, feeding_interval, feeding_portion, description]);
        res.status(201).json({ message: 'Diet plan created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Diet Plan
router.delete('/diet-plan/delete', async (req, res) => {
    try {
        const { uid, cname, dp_number } = req.body;
        await db.query(deleteDietPlanQuery, [uid, cname, dp_number]);
        res.status(200).json({ message: 'Diet plan deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read All Diet Plans for Cat
router.get('/diet-plan/list', async (req, res) => {
    try {
        const { uid, cname } = req.query;
        const [results] = await db.query(readAllDietPlansQuery, [uid, cname]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read Specific Diet Plan
router.get('/diet-plan/get', async (req, res) => {
    try {
        const { dp_number } = req.query;
        const [results] = await db.query(readDietPlanQuery, [dp_number]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update Diet Plan
router.put('/diet-plan/update', async (req, res) => {
    try {
        const { feeding_interval, feeding_portion, description, dp_number } = req.body;
        await db.query(updateDietPlanQuery, [feeding_interval, feeding_portion, description, dp_number]);
        res.status(200).json({ message: 'Diet plan updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//             FOOD ROUTES
// ==========================================

// Create Food
router.post('/food/create', async (req, res) => {
    try {
        const { brand, name, type, calories, carbs, protein, fat } = req.body;
        // Pass NULL for the first parameter (fid) so MySQL auto-increments it
        await db.query(createFoodQuery, [null, brand, name, type, calories, carbs, protein, fat]);
        res.status(201).json({ message: 'Food created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Food
router.delete('/food/delete', async (req, res) => {
    try {
        const { fid } = req.body;
        await db.query(deleteFoodQuery, [fid]);
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read Food by ID
router.get('/food/get-by-id', async (req, res) => {
    try {
        const { fid } = req.query;
        const [results] = await db.query(readFoodIdQuery, [fid]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read Food by Name
router.get('/food/get-by-name', async (req, res) => {
    try {
        const { name } = req.query;
        const [results] = await db.query(readFoodNameQuery, [name]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update Food
router.put('/food/update', async (req, res) => {
    try {
        const { brand, name, type, calories, carbs, protein, fat, fid } = req.body;
        await db.query(updateFoodQuery, [brand, name, type, calories, carbs, protein, fat, fid]);
        res.status(200).json({ message: 'Food updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//             FEEDS ROUTES
// ==========================================

// Create Feed Entry
router.post('/feeds/create', async (req, res) => {
    try {
        const { uid, cname, fid, feed_date, feed_time } = req.body;
        await db.query(createFeedQuery, [uid, cname, fid, feed_date, feed_time]);
        res.status(201).json({ message: 'Feed entry created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Feed Entry
router.delete('/feeds/delete', async (req, res) => {
    try {
        const { uid, cname, fid, feed_date, feed_time } = req.body;
        await db.query(deleteFeedQuery, [uid, cname, fid, feed_date, feed_time]);
        res.status(200).json({ message: 'Feed entry deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read Cat Feeds
router.get('/feeds/list', async (req, res) => {
    try {
        const { uid, cname } = req.query;
        const [results] = await db.query(readCatFeedsQuery, [uid, cname]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//             CAT PROBLEM ROUTES
// ==========================================

// Create Cat Problem
router.post('/cat-problem/create', async (req, res) => {
    try {
        const { uid, cname, pname, diagnosis_date, severity, description } = req.body;
        await db.query(createCatProblemQuery, [uid, cname, pname, diagnosis_date, severity, description]);
        res.status(201).json({ message: 'Cat problem created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Cat Problem
router.delete('/cat-problem/delete', async (req, res) => {
    try {
        const { uid, cname, pname } = req.body;
        await db.query(deleteCatProblemQuery, [uid, cname, pname]);
        res.status(200).json({ message: 'Cat problem deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read All Problems for Cat
router.get('/cat-problem/list', async (req, res) => {
    try {
        const { uid, cname } = req.query;
        const [results] = await db.query(readAllCatProblemsQuery, [uid, cname]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read Specific Problem
router.get('/cat-problem/get', async (req, res) => {
    try {
        const { uid, cname, pname } = req.query;
        const [results] = await db.query(readCatProblemQuery, [uid, cname, pname]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update Cat Problem
router.put('/cat-problem/update', async (req, res) => {
    try {
        const { severity, description, uid, cname, pname } = req.body;
        await db.query(updateCatProblemQuery, [severity, description, uid, cname, pname]);
        res.status(200).json({ message: 'Cat problem updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//      REFERENCED_IN (DIET PLAN FOODS)
// ==========================================

// Add Food to Plan.   ASSUMING this query would be run alongside the related query that creates a diet plan?
router.post('/diet-plan/add-food', async (req, res) => {
    try {
        const { uid, cname, dp_number, fid } = req.body;
        await db.query(addFoodToPlanQuery, [uid, cname, dp_number, fid]);
        res.status(201).json({ message: 'Food added to diet plan successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Remove Food from Plan
router.delete('/diet-plan/remove-food', async (req, res) => {
    try {
        const { uid, dp_number, fid } = req.body;
        await db.query(removeFoodFromPlanQuery, [uid, dp_number, fid]);
        res.status(200).json({ message: 'Food removed from diet plan successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get Foods in Plan
router.get('/diet-plan/get-foods', async (req, res) => {
    try {
        const { uid, dp_number } = req.query;
        const [results] = await db.query(readPlanFoodsQuery, [uid, dp_number]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//          MEDICINAL PROBLEM ROUTES
// ==========================================

// Create Medicinal Problem
router.post('/med-problem/create', async (req, res) => {
    try {
        const { Mname, description } = req.body;
        await db.query(createMedProblemQuery, [Mname, description]);
        res.status(201).json({ message: 'Medicinal problem created successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Medicinal Problem
router.delete('/med-problem/delete', async (req, res) => {
    try {
        const { Mname } = req.body;
        await db.query(deleteMedProblemQuery, [Mname]);
        res.status(200).json({ message: 'Medicinal problem deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Find Medicinal Problem (Search)
router.get('/med-problem/search', async (req, res) => {
    try {
        const { query } = req.query;
        const [results] = await db.query(findMedProblemQuery, [query]);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Read One Medicinal Problem
router.get('/med-problem/get', async (req, res) => {
    try {
        const { Mname } = req.query;
        const [results] = await db.query(readMedProblemQuery, [Mname]);
        res.status(200).json(results[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get All Medicinal Problems (for dropdown)
router.get('/med-problem/list', async (req, res) => {
    try {
        const [results] = await db.query(readAllMedProblemsQuery);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update Medicinal Problem
router.put('/med-problem/update', async (req, res) => {
    try {
        const { description, Mname } = req.body;
        await db.query(updateMedProblemQuery, [description, Mname]);
        res.status(200).json({ message: 'Medicinal problem updated successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//          SITE MANAGER ROUTES
// ==========================================

// Check if user is a site manager
router.get('/site-manager/check', async (req, res) => {
    try {
        const { uid } = req.query;
        const [results] = await db.query(checkSiteManagerQuery, [uid]);
        res.status(200).json({ isSiteManager: results.length > 0 });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
//          ALL FOODS ROUTE
// ==========================================

// Get All Foods
router.get('/food/list', async (req, res) => {
    try {
        const [results] = await db.query(readAllFoodsQuery);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;