const express = require('express');
const router = express.Router();
const db = require('../index.js').db; // Import the database connection

const fs = require('fs');           // File system tool to read files
const path = require('path');       // Path tool to handle file paths
const SQL_PATH = require('../index.js').SQL_PATH; // import SQL folder path

router.post('/init', async (req, res) => { // /dev/init
    try {
        const createScripts = fs.readFileSync(path.join(SQL_PATH, '/init/table_setup.sql'), 'utf8');
        await db.query(createScripts);

        const validInsertScripts = fs.readFileSync(path.join(SQL_PATH, '/init/populate_valid.sql'), 'utf8');
        await db.query(validInsertScripts);
        
        res.status(200).json({ message: "Database initialized successfully!" });
    } catch(e) {
        console.log(e);
        res.status(500).json({error: 'Error: database init', details: e.message});
    }
});

router.post('/test_invalid', async (req, res) => { // /dev/test_invalid
    try {
        const invalidInsertScripts = fs.readFileSync(path.join(SQL_PATH, '/init/test_invalid.sql'), 'utf8');
        
        // Split the script into individual INSERT statements
        const statements = invalidInsertScripts
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);
        
        const results = [];
        
        for (let i = 0; i < statements.length; i++) {
            try {
                await db.query(statements[i]);
                results.push({
                    status: 'UNEXPECTED SUCCESS',
                    query: statements[i]
                });
            } catch (err) {
                results.push({
                    status: 'EXPECTED FAILURE',
                    error: err.message,
                    query: statements[i]
                });
            }
        }

        return res.status(200).json({ 
            message: "Invalid data test completed",
            totalStatements: statements.length,
            results: results
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({error: 'Error: reading invalid data script', details: e.message});
    }
});

module.exports = router;