const express = require('express');
const router = express.Router();
const { db } = require('../index.js'); // Import the database connection

const fs = require('fs');           // File system tool to read files
const path = require('path');       // Path tool to find files

router.post('/init', async (req, res) => { // /db/init
    try {
        const createScripts = fs.readFileSync(path.join(__dirname, 'table_setup.sql'), 'utf8');
        await db.query(createScripts);

        const validInsertScripts = fs.readFileSync(path.join(__dirname, 'populate_valid.sql'), 'utf8');
        await db.query(validInsertScripts);

        // const invalidInsertScripts = fs.readFileSync(path.join(__dirname, 'populate_invalid.sql'), 'utf8');
        // await db.query(validInsertScripts);
        
        res.status(200).json({ message: "Database initialized successfully!" });
    } catch(e) {
        console.log(e);
        res.status(500).json({error: 'Error: database init', details: e.message});
    }
});

module.exports = router;