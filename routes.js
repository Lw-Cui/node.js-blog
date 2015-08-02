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

    var blog = model.get_blog();
    var post = model.generate_post(model.get_new_id(blog), title, content);
    model.add_post(blog, post);
    model.store_blog(blog);
});

app.get('/add_post', function(req, res) {
    res.render('add_post', {});
});


app.post('/edit_post/:num',function(req, res) {

});

app.post('/del_post/:num', function(req, res) {

});

app.get('/archives/', function(req, res) {
    var blog = model.get_blog();
    res.send(JSON.stringify(blog));
});

app.get('/tag/:tag_name/:num', function(req, res) {

});

app.get('/post/:title', function(req, res) {
    var blog = model.get_blog();
    var post = model.query_title(blog, req.param('title'));
    res.send(JSON.stringify(post));
});


var port = 3000;

app.listen(port, function() {
    console.log("Server started! We are in localhost " + port);
});
