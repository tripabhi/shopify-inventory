var sqlite3 = require("sqlite3").verbose();
var ITEM_SCHEMA = require("../schema/dbSchema");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(ITEM_SCHEMA, (err) => {
      if (err) {
        // Table already created
        console.log("Table already created");
      } else {
        // Table just created, creating some rows
        console.log("Table created");
      }
    });
  }
});

module.exports = db;
