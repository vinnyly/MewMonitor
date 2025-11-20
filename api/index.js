//The Toolkit (Imports)
const express = require('express'); // The web server framework (The "Waiter" training)
const mysql = require('mysql2');    // The tool to talk to MySQL (The "Kitchen" key)
const cors = require('cors');       // Security permissions
require('dotenv').config();         // The tool to read your secret password file

//Setup (Initialization)
const app = express(); //actual server object. Anytime you want the server to do something, you say app.doSomething()
const PORT = process.env.PORT || 3000; //like a radio frequency

//The Rules (Middleware)
app.use(cors()); //Security rules. bodyguard
app.use(express.json());

//DATABASE CONNECTION POOL
// We use a "pool" to manage connections efficiently. 
// It handles opening/closing connections for you automatically.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const db = pool.promise(); // Convert pool to use Promises (allows using async/await which is cleaner)



//API ROUTES (ENDPOINTS)

// Test Route: Just to check if the server is alive
app.get('/', (req, res) => {
    res.send('API is running!');
});

// GET /api/items - Fetch ALL items from the database
app.get('/api/items', async (req, res) => {
    try {
        // Run the SQL query
        const [rows] = await db.query('SELECT * FROM items');
        // Send the data back to the frontend
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/items/:id - Fetch a SINGLE item by ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Use ? as a placeholder to prevent SQL Injection attacks
        const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/items - Create a NEW item
app.post('/api/items', async (req, res) => {
    try {
        // Extract data sent from the frontend (e.g., name, price)
        const { name, description } = req.body;
        
        // Validate data
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Insert into database
        const [result] = await db.query(
            'INSERT INTO items (name, description) VALUES (?, ?)', 
            [name, description]
        );
        
        // Send back the new ID so the frontend knows it succeeded
        res.status(201).json({ id: result.insertId, name, description });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

//START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});