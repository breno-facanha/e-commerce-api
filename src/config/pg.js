const pg = require("pg");
require("dotenv").config();

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URI,
})

db.connect( (err) => {
    if (err) {
        console.error("Connection error", err.stack);
    } else {
        console.log("Connected to the database");
    }
});

module.exports = db;