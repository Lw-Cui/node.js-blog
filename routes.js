/**
 * Created by lw on 15-8-1.
 */

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var body_parser = require('body-parser');
app.use(body_parser());

var session = require('express-session');
app.use(session({
    secret: 'blog system'
}));

var model = require("./model");
app.set('view engine', 'jade');

var blog = new model.Blog();
var auth = new model.Auth();

var checkAuth = function (req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.send("you have no right to take the operation\n");
    }
};

app.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    auth.register(username, password);
    res.send(username + " registers successfully\n");
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    auth.login(username, password, function (id) {
        if (id != -1) {
            req.session.user_id = id;
            res.send("user No." + id + " log in\n");
        } else {
            res.send("username doesn't match password\n");
        }
    });
});

app.get('/logout', function (req, res) {
    var user_id = req.session.user_id;
    delete req.session.user_id;
    res.send('user No.' + user_id + 'log out\n');
});


app.post('/add_post', checkAuth, function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    blog.new_post(title, content, req.session.user_id);
    res.send("user No." + req.session.user_id
        + ' add post named ' + title + '\n');
});


app.post('/edit_post/:id', checkAuth, function (req, res) {
    var user_id = req.session.user_id;
    var article_id = req.param('id');
    var title = req.body.title;
    var content = req.body.content;
    blog.edit(article_id, user_id, title, content);
    res.send("user No." + user_id  + ' edit post which id is ' + article_id + '\n');
});

app.get('/del_post/:id', checkAuth, function (req, res) {
    var user_id = req.session.user_id;
    var article_id = req.param('id');
    blog.delete(article_id, user_id);
    res.send("user No." + user_id  + ' edit post which id is ' + article_id + '\n');
});


app.get('/post/:title', function (req, res) {
    var post = blog.query('title', req.param('title'), function (post) {
        res.send(JSON.stringify(post) + '\n');
    });
});

app.get('/post_id/:id', function (req, res) {
    var post = blog.query('article_id',req.param('id'), function (post) {
        res.send(JSON.stringify(post) + '\n');
    });
});

var port = 3000;

app.listen(port, function () {
    console.log("Server started! We are in localhost " + port);
});
