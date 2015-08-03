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

exports.Blog.prototype.save = function () {
};

exports.Blog.prototype.query = function (key, value) {

};

