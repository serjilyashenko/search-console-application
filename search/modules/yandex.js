var request = require('request'),
    cheerio = require("cheerio"),
    qs = require('querystring');

function Yandex() {
    if (!(this instanceof Yandex)) {
        return new Yandex();
    }
}

Yandex.prototype.search = function (query, callback) {
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

Yandex.prototype._getOptions = function (query) {
    return {
        uri: this._getUri(query),
        method: 'GET',
        timeout: 5000
    };
};

Yandex.prototype._getUri = function (query) {
    var uriHead = 'https://yandex.by/search/?rdrnd=579872&';

    return uriHead + qs.stringify({'text': "'" + query + "'"});
};

Yandex.prototype._parseBody = function (body) {
    var result = [],
        $ = cheerio.load(body),
        $items = $('.organic').slice(0, 10);

    $items.each(function (index, item) {
        var $item = $(item),
            resultItem = {
                name: $item.find('.serp-item__title-link').text(),
                url: $item.find('.path__item').text(),
                description: $item.find('.organic__text').text()
            };

        result.push(resultItem);
    });

    return result;
};

module.exports = new Yandex();
