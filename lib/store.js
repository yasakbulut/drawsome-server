function Store(){
    this.items = {};
}

Store.prototype.put = function (key, object) {
    this.items[key] = object;
};

Store.prototype.get = function (key) {
    return this.items[key];
};

Store.prototype.reset = function () {
    this.items = {};
};

module.exports = new Store();