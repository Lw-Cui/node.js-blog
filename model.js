/**
 *
 * Created by lw on 15-8-2.
 */


exports.Blog = function () {
    this.sql = require('mysql');
    this.connection = this.sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'greatclw',
        database: 'blog'
    });
    this.connection.connect();
};

exports.Blog.prototype.new_post = function (title, content) {

    var str =
        'INSERT INTO blog VALUES(NULL, "' + title + '", "' + content + '");';
    console.log(str);
    this.connection.query(str);
};

exports.Blog.prototype.query = function (key, value) {
    var str =
        'SELECT * FROM blog WHERE ' + key + '="' + value + '";';
    console.log(str);
    this.connection.query(str, function(error, results, fields) {
        console.log(results);
    })
};

exports.Blog.prototype.edit = function (id, title, content) {
    var str =
        'UPDATA blog SET title="' + title + '", content="' + content + '"' + 'WHERE id="' + id + '";';
    console.log(str);
    this.connection.query(str);
};
