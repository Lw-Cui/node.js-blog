function Post(title) {
    this.title = title;
}

Post.prototype.getTitle = function() {
    return this.title;
};

