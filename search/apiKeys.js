var fs = require('fs');

function ApiKeys() {
    if (!(this instanceof ApiKeys)) {
        return new ApiKeys();
    }

    this.keys = this._getKeys();
}

ApiKeys.prototype._getKeys = function () {
    var apikey = {},
        contents;

    try {
        contents = fs.readFileSync('keys', 'utf8');
        apikey = JSON.parse(contents);
    } catch (exception) {
        // do nothing
    }

    return apikey;
};

ApiKeys.prototype.get = function (searcher) {
    return this.keys[searcher] || null;
};

module.exports = new ApiKeys();
