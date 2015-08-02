var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'greatclw',
    database: 'blog'
});

connection.connect();

connection.query('INSERT INTO blog VALUES(NULL, "Hello world", "Cross the Great Wall we can reach each corner in the world")');

connection.end();
