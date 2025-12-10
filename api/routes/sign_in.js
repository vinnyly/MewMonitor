const express = require('express');
const router = express.Router();
const db = require('../index.js').db; // Import the database connection

const fs = require('fs');           // File system tool to read files
const path = require('path');       // Path tool to handle file paths
const SQL_PATH = require('../index.js').SQL_PATH; // import SQL folder path

// Pre-load SQL query at startup for efficiency
const loginQuery = fs.readFileSync(path.join(SQL_PATH, 'user/read_login.sql'), 'utf8');
const profileQuery = fs.readFileSync(path.join(SQL_PATH, 'user/read_user_profile.sql'), 'utf8');

router.get('/', async (req, res) => {
    // Return a simple message (frontend handles the actual page)
    res.status(200).json({ message: 'Sign in endpoint ready' });
});

router.get('/profile', async (req, res) => {
    try {
        const { uid } = req.query;

        if (!uid) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const [results] = await db.query(profileQuery, [uid]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        return res.status(200).json({ name: user.name });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Error fetching user profile', details: e.message });
    }
});

router.post('/uh', async (req, res) => {
    //another route to return signin??? what that mean
});

router.post('/form', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const [results] = await db.query(loginQuery, [email]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ 
            message: 'Login successful',
            uid: user.uid
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Error during login', details: e.message });
    }
});

module.exports = router;