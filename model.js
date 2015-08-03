/**
 *
 * Created by lw on 15-8-2.
 */
exports.Auth = function () {
    this.sql = require('mysql');
    this.connection = this.sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'greatclw',
        database: 'blog'
    });
    this.connection.connect();
};


exports.Auth.prototype.login = function (username, password, set_id) {
    var str =
        'SELECT * FROM user WHERE username="'
        + username + '"and password="' + password + '";';
    console.log(str);
    var id = -1;
    this.connection.query(str, function(error, results, fields) {
        if (results.length)
            set_id(results[0].user_id);
        else
            set_id(-1);
    });
};

exports.Auth.prototype.register = function (username, password) {
    var str =
        'INSERT INTO user VALUES(NULL, "' + username + '", "' + password + '");';
    console.log(str);
    this.connection.query(str);
};


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

exports.Blog.prototype.new_post = function (title, content, user_id) {
    var str =
        'INSERT INTO article VALUES(NULL, "' + title + '", "' + content + '",' + user_id + ');';
    console.log(str);
    this.connection.query(str);
};

exports.Blog.prototype.query = function (key, value, show) {
    var str =
        'SELECT * FROM article WHERE ' + key + '="' + value + '";';
    console.log(str);
    this.connection.query(str, function(error, results, fields) {
        show(results);
    });
};

exports.Blog.prototype.edit = function (id, title, content) {
    var str =
        'UPDATE article SET title="' + title + '", content="' + content + '"' + 'WHERE article_id=' + id + ';';
    console.log(str);
    this.connection.query(str);
};

exports.Blog.prototype.delete = function (id) {
    var str =
        'DELETE FROM article WHERE article_id=' + id + ';';
    console.log(str);
    this.connection.query(str);
};

exports.Blog.prototype.register = function (username, password) {
    var str =
        'INSERT INTO user VALUES(NULL, "' + username + '", "' + pasword + '");';

};