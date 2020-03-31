const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(255) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const TASK_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_title VARCHAR(40) NOT NULL,
    task_description TEXT DEFAULT ('') NOT NULL, 
    task_create_date TIMESTAMP NOT NULL,
    task_deadline TIMESTAMP NOT NULL,
    task_status INTEGER NOT NULL,
    category_id INTEGER, 
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE CASCADE
)
`;

const CATEGORY_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_description TEXT DEFAULT ('') NOT NULL,
    category_color VARCHAR(20) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(CATEGORY_SCHEMA);
    db.run(TASK_SCHEMA);
            
    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;