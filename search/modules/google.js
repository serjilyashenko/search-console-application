var request = require('request'),
    cheerio = require("cheerio"),
    qs = require('querystring');

function Google() {
    if (!(this instanceof Google)) {
        return new Google();
    }
}

Google.prototype.search = function (query, callback) {
    var self = this,
        options;

    if (!query) {
        return [];
    }

    options = this._getOptions(query);

    request(options, function (error, response, body) {
        var result = [];

        if (response.statusCode === 200) {
            result = self._parseBody(body);
        } else {
            error = new Error(body);
        }

        if (typeof callback === 'function') {
            callback(result, error);
        }
    });
};

Google.prototype._getOptions = function (query) {
    return {
        uri: this._getUri(query),
        method: 'GET',
        timeout: 5000
    };
};

Google.prototype._getUri = function (query) {
    var uriHead = 'https://www.google.com/search?';

    return uriHead + qs.stringify({'q': "'" + query + "'"}) + '&ie=utf-8&oe=utf-8';
};

Google.prototype._parseBody = function (body) {
    var result = [],
        $ = cheerio.load(body),
        $items = $('div.g');

    $items.each(function (index, item) {
        var $item = $(item),
            resultItem = {
                name: $item.find('h3.r a').text(),
                url: $item.find('cite').text(),
                description: $item.find('span.st').text()
            };

        result.push(resultItem);
    });

    return result;
};

module.exports = new Google();
