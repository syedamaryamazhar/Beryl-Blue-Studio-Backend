const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bbs_management'
});

db.connect((err) => {
    if(err) {
        console.error('Database connection failed: ', err.message);
    }
    else{
        console.log('Connected to MySQL Database: bbs_management');
    }
});

module.exports = db;