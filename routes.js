/**
 * Created by lw on 15-8-1.
 */

var express = require('express');
var app = express();

var body_parser = require('body-parser');
app.use(body_parser());

app.use(express.static('static'));
var view = require("./model");
app.set('view engine', 'jade');

var fs = require('fs');

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
    var body = req.body.body;
    res.send('Your title: ' + title + '\nYour body: ' + body);

    var blogs = require("./data.json");
    blogs.next_id += 1;
    var blog = {
        id: blogs.next_id,
        title: title,
        body: body
    };
    blogs.articles.push(blog);

    fs.writeFile("data.json", JSON.stringify(blogs), 'utf8', function() {
        console.log("Stored in file");
    });
});

app.get('/add_post', function(req, res) {
    res.render('add_post', {});
});


app.post('/edit_post/:num',function(req, res) {

});

app.post('/del_post/:num', function(req, res) {

});

app.get('/archives/:num', function(req, res) {

});

app.get('/tag/:tag_name/:num', function(req, res) {

});

app.get('/query/:condition', function(req, res) {

});


var port = 3000;

app.listen(port, function() {
    console.log("Server started! We are in localhost " + port);
});
