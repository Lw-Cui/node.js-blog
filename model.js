/**
 *
 * Created by lw on 15-8-2.
 * ATTENTION: Blog object has to be improved and corrected.
 *
 */

exports.Blog = function() {
    this.articles = require("./data/data.json");
    var max_id = 0;
    for(var i = 0; this.articles.length; i++)
        max_id = Math.max(max_id, this.articles[i].id);
    this.next_id = max_id;
};


exports.Blog.prototype.new_post = function(title, content) {
    //var time = require('./timestamp');
    this.articles.push({
        "id": ++this.next_id,
        "title": title,
        "content": content,
        "is_deleted": false
        //"date": time.timestamp()
    });
};

exports.Blog.prototype.save = function() {
    var fs = require('fs');
    var posts = this.articles;
    var stream = fs.createWriteStream("./data/data.json");
    stream.once('open', function() {
        stream.write('[');
        for (var i = 0; i < posts.length; i++)
            if (!posts[i].is_deleted)
                stream.write(JSON.stringify(posts[i] + ','));
        steam.write(']');
    });
};

exports.Blog.prototype.query = function(key, value) {
    var posts = [];
    for (var i = 0; i < this.blog.articles.length; i++)
        if (this.blog.articles[i][key] == value)
            posts.push(this.blog.articles[i]);
    return posts;
};

exports.Blog.prototype.delete = function(id) {
    var posts = this.query('id', id);
    if (posts.length)
        posts.is_deleted = true;
};

exports.Blog.prototype.modify = function(id, title, content) {
    var posts = this.query('id', id);
    posts[0].title = title;
    posts[0].content = content;
};