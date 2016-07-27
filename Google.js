var request = require('request');

var Google = function () {
    var options;

    if (!(this instanceof Google)) {
        return new Google();
    }

    var options = {
        uriHead: 'https://www.google.com/search?q=',
        format: 'json',
        count: 10
    };

    this.search = function (query, callback) {
        if (!query) {
            console.log('empty query');
            return;
        }

        fullUri = options.uriHead + query;

        // TODO: stringfy query (code it);

        request({
            uri: fullUri + '&ie=utf-8&oe=utf-8',
            method: 'GET',
            headers: {
                'User-Agent': 'Google Search Client for Node.js'
            },
            timeout: 5000

        }, function (err, res, body) {

            if (res && res.statusCode !== 200) {
                err = new Error(body);
            } else {
    
                // Parse body, if body
                // body = typeof body === 'string' ? JSON.parse(body) : body;
            }
            if (typeof callback === 'function') {
                callback(err, res, body);
            }
        });
    };

};

module.exports = Google;
