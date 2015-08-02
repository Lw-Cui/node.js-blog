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



app.get('/', function(req, res) {

});

app.get('/register', function(req, res) {

});

app.post('/login', function(req, res) {

});

app.post('/logout', function(req, res) {

});

app.get('/about', function(req, res) {

});


app.post('/add_post', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    res.send('Your title: ' + title + '\nYour content: ' + content);

    var blog = new model.Blog();
    blog.new_post(title, content);
    blog.save();
});

app.get('/add_post', function(req, res) {
    res.render('add_post', {});
});


app.post('/edit_post/:id',function(req, res) {
    var blog = new model.Blog();
    var post = blog.query('id', req.param('id'));

    var title = req.body.title;
    var content = req.body.content;
    if (post.length) {
        post[0].title = title;
        post[0].content = content;
        blog.save();
    }
});

app.get('/del_post/:id', function(req, res) {
    var blog = new model.Blog();
    blog.delete(parseInt(parseInt(req.param('id'))));
    blog.save();
});

app.get('/archives/', function(req, res) {
});

app.get('/tag/:tag_name/:num', function(req, res) {

});

app.get('/post/:title', function(req, res) {
    var blog = new model.Blog();
    var post = blog.query('title', req.param('title'));
    res.send(JSON.stringify(post));
});


var port = 3000;

app.listen(port, function() {
    console.log("Server started! We are in localhost " + port);
});
