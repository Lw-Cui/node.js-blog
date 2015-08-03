/**
 *
 * Created by lw on 15-8-2.
 */
var model = require("./../model");

var blog = new model.Blog();

var length = 5000;
for (var i = 1; i < length; i++) {
     blog.new_post('post' + i, '', 2);
}
