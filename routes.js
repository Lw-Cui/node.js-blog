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
    req.send(username + " Register successfully\n");
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    auth.login(username, password, function (id) {
        if (id != -1) {
            req.session.user_id = id;
            res.send("you are logged in successfully\n");
        } else {
            res.send("username doesn't match password\n");
        }
    });
});

app.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.send("log out\n");
});


app.post('/add_post', checkAuth, function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    blog.new_post(title, content, req.session.user_id);
    res.send("you are operating as " + req.session.user_id + 'to add post\n');
});


app.post('/edit_post/:id', checkAuth, function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    blog.edit(Number(req.param('id')), title, content);
    res.send("you are operating as " + req.session.user_id  + 'edit post\n');
});

app.get('/del_post/:id', checkAuth, function (req, res) {
    blog.delete(Number(req.param('id')));
    res.send("you are operating as " + req.session.user_id + 'delete post\n');
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
