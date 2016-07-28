var bing = require('./search/modules/Bing.js'),
    google = require('./search/modules/Google.js'),
    yandex = require('./search/modules/Yandex.js'),
    search;

search = function (query) {
    console.log(query, ' -> searching...');

    bing.search(query, function (result) {
        console.log("BING:");
        show(result);
    });

    google.search(query, function (result) {
        console.log("GOOGLE:");
        show(result);
    });

    yandex.search(query, function (result) {
        console.log('YANDEX:');
        show(result);
    });
};

function show(result) {
    result.forEach(function (item, index) {
        console.log((index + 1) + ') ' + item.name);
        console.log('   ' + item.description + '\n');
    });
}

module.exports = search;
