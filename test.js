/**
 *
 * Created by lw on 15-8-2.
 */
var randomArray = require('./random.json');
var model = require("./model");

var blog = new model.Blog();
var length = randomArray.length;
for (var i = 1; i < length; i++) {
     blog.query('id', Math.floor(Math.random() * length));
}