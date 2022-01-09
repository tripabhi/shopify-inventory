const ITEM_SCHEMA = `CREATE TABLE item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    tags TEXT,
    inventory_count INTEGER NOT NULL
)`;

module.exports = ITEM_SCHEMA;
