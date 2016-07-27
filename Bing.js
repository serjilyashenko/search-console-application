var request = require('request');

var Bing = function (apikey) {
    var options;

    if (!(this instanceof Bing)) {
        return new Bing(apikey);
    }

    var options = {
        uriHead: 'https://api.datamarket.azure.com/Bing/Search/v1/Web?',
        apikey: apikey || null,
        format: 'json',
        count: 10
    };

    this.search = function (query, callback) {
        if (!query) {
            console.log('empty query');
            return;
        }

        fullUri = options.uriHead + '$format=json&' + "$top=10&" +"Query=" + "%27" + query + "%27";

        // TODO: stringfy query (code it);

        request({
            uri: fullUri,
            method: 'GET',
            headers: {
                'User-Agent': 'Bing Search Client for Node.js'
            },
            auth: {
                user: options.apikey,
                pass: options.apikey
            },
            timeout: 5000

        }, function (err, res, body) {

            if (res && res.statusCode !== 200) {
                err = new Error(body);
            } else {
    
            // Parse body, if body
            body = typeof body === 'string' ? JSON.parse(body) : body;
            }
            if (typeof callback === 'function') {
                callback(err, res, body);
            }
        });
    };

};

module.exports = Bing;
