var request = require('request'),
    qs = require('querystring'),
    apiKeys = require('./../ApiKeys.js');

function Bing() {
    if (!(this instanceof Bing)) {
        return new Bing();
    }

    this._apikey = apiKeys.get('bing');

    if (!this._apikey) {
        throw new Error('Bing Api key is not found');
    }
}

Bing.prototype.search = function (query, callback) {
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

Bing.prototype._getOptions = function (query) {
    return {
        uri: this._getUri(query),
        method: 'GET',
        auth: {
            user: this._apikey,
            pass: this._apikey
        },
        timeout: 5000
    };
};

Bing.prototype._getUri = function (query) {
    var uriHead = 'https://api.datamarket.azure.com/Bing/Search/v1/Web?';

    return uriHead + '$format=json&' + '$top=10&' + qs.stringify({'Query': "'" + query + "'"});
};

Bing.prototype._parseBody = function (body) {
    var bodyResults = [],
        result = [];

    try {
        bodyResults = JSON.parse(body).d.results;
    } catch (exception) {
        // do nothing
    }

    bodyResults.forEach(function (item) {
        var resultItem = {
            name: item.Title,
            url: item.Url,
            description: item.Description
        };

        result.push(resultItem);
    });

    return result;
};

module.exports = new Bing();
