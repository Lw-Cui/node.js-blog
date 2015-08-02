/**
 *
 * Created by lw on 15-8-2.
 */
var fs = require('fs');

exports.generate_post = function(id, title, content) {
    return {
        "id": id,
        "title": title,
        "content": content
    };
};

exports.get_blog = function() {
    return require("./data.json");
};

exports.store_blog = function(blog) {
    fs.writeFile("data.json", JSON.stringify(blog), 'utf8', function() {
        console.log("Stored in file");
    });
};

exports.add_post = function(blog, post) {
    blog.articles.push(post);
};

exports.get_new_id = function(blog) {
    return ++blog.next_id;
};

exports.query_title = function(blog, title) {
    var posts = [];
    for (var i = 0; i < blog.articles.length; i++)
       if (blog.articles[i].title == title)
            posts.push(blog.articles[i]);
    return posts;
};