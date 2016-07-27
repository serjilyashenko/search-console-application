var request = require('request');

var Yandex = function () {
    var options;

    if (!(this instanceof Yandex)) {
        return new Yandex();
    }

    var options = {
        uriHead: 'https://yandex.by/search/?rdrnd=579872&text=',
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
            uri: fullUri,
            method: 'GET',
            headers: {
                'User-Agent': 'Yandex2 Search Client for Node.js'
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

module.exports = Yandex;
