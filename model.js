/**
 *
 * Created by lw on 15-8-2.
 */
var fs = require('fs');

exports.Blog = function() {
    this.blog = require("./data.json");
};

exports.Blog.prototype.new_post = function(title, content) {
    this.blog.articles.push({
        "id": ++this.blog.next_id,
        "title": title,
        "content": content,
        "date": Date.now()
    });
};

exports.Blog.prototype.save = function() {
    fs.writeFile("data.json", JSON.stringify(this.blog), 'utf8', function() {
        console.log("Stored in file");
    });
};

exports.Blog.prototype.query = function(key, value) {
    var posts = [];
    for (var i = 0; i < this.blog.articles.length; i++)
        if (this.blog.articles[i][key] == value)
            posts.push(this.blog.articles[i]);
    return posts;
};

