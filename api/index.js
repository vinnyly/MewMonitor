const INIT = true; // TEMP: Set to true to enable DB initialization route
/**
 * API SETUP (RARELY TOUCH THIS)
 */
// Import Libraries
const express = require('express'); // The web server framework (The "Waiter" training)
const mysql = require('mysql2');    // The tool to talk to MySQL (The "Kitchen" key)
const cors = require('cors');       // Security permissions
require('dotenv').config();         // The tool to read your secret password file

// Setup Express (Initialization)
const app = express(); //actual server object. Anytime you want the server to do something, you say app.doSomething()
const PORT = process.env.PORT || 3000; //like a radio frequency

// Setup Middleware
app.use(cors()); //Security rules. bodyguard
app.use(express.json());

// DATABASE CONNECTION POOL
// Handles opening/closing connections for you automatically.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: INIT // TEMP: This allows running a file with multiple queries; only enable for setup scripts
});
const db = pool.promise(); // Convert pool to use Promises (allows using async/await which is cleaner)
module.exports.db = db; // Export the database connection for use in other files

const SQL_PATH = __dirname + '/sql/';
module.exports.SQL_PATH = SQL_PATH; // export SQL folder path



/**
 * CHANGE STUFF BELLOW HERE TO ADD MORE ROUTES
 */
// ROUTERS
if (INIT) {
    const dbInitRouter = require('./routes/db_init.js');
    app.use('/dev', dbInitRouter);
}
const signinRouter = require('./routes/sign_in.js');
app.use('/signin', signinRouter);

//API ROUTES (ENDPOINTS)

// Test Route: Just to check if the server is alive
app.get('/', (req, res) => {
    res.send('API is running!');
});








// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});