/**
 * Created by lw on 15-8-1.
 */

var express = require('express');
var app = express();

var body_parser = require('body-parser');
app.use(body_parser());

app.use(express.static('static'));
var model = require("./model");
app.set('view engine', 'jade');

var blog = new model.Blog();

app.get('/', function (req, res) {

});

app.get('/register', function (req, res) {

});

app.post('/login', function (req, res) {

});

app.post('/logout', function (req, res) {

});

app.get('/about', function (req, res) {

});


app.post('/add_post', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    res.send('Your title: ' + title + '\nYour content: ' + content);
    blog.new_post(title, content);
});

app.get('/add_post', function (req, res) {
    res.render('add_post', {});
});


app.post('/edit_post/:id', function (req, res) {
    blog.query('id', req.param('id'));
    var title = req.body.title;
    var content = req.body.content;
    blog.edit(Number(req.param('id')), title, content);
    blog.query('id', req.param('id'));
});

app.get('/del_post/:id', function (req, res) {
    blog.query('id', req.param('id'));
    blog.delete(Number(req.param('id')));
    blog.query('id', req.param('id'));
});

app.get('/archives/', function (req, res) {
});

app.get('/tag/:tag_name/:num', function (req, res) {

});

app.get('/post/:title', function (req, res) {
    var post = blog.query('title', req.param('title'));
    res.send(JSON.stringify(post));
});

app.get('/post_id/:id', function (req, res) {
    var post = blog.query('id', Number(req.param('id')));
    res.send(JSON.stringify(post));
});

var port = 3000;

app.listen(port, function () {
    console.log("Server started! We are in localhost " + port);
});
