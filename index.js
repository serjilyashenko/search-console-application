var bing = require('./bing.js')("y8niSwL89ri0S2MF5MQ+rW6wKB/FPCyB7okQUeVswpg"),
    google = require('./google.js')(),
    yandex = require('./yandex.js')(),
    cheerio = require("cheerio");

console.log(process.argv[2], ' -> searching...');

// Bing search

bing.search(process.argv[2], function(error, res, body){
    console.log("BING");
    // console.log(res);

    body.d.results.forEach(function (item, index) {
        console.log(">> " + index);
        console.log(item);
        console.log();
    });
  });


// Google search

google.search(process.argv[2], function (error, res, body) {
    if (!error) {
        console.log("GOOGLE");
        var $ = cheerio.load(body),
            $r = $("h3.r a");

        $r.each(function (index, item) {
            var siteName = $(item).html();

            console.log(">> " + siteName);
        });

    } else {
        console.log("Произошла ошибка: " + error);
    }
});


// Yandex search

// yandex.search(process.argv[2], function (error, res, body) {
//     if (!error) {
//         console.log(body);
//         var $ = cheerio.load(body),
//             // $r = $("a.serp-item__title-link");
//             $organics = $('.organic');

//         $organics.each(function (index, item) {
//             var organic = $(item),
//                 name = organic.find('.serp-item__title-link').text(),
//                 link = organic.find('.path__item').text(),
//                 text = organic.find('.organic__text').text();

//             console.log(">> " + name);
//             console.log("   " + link);
//             console.log(text);
//             // console.log();
//         });

//     } else {
//         console.log("Произошла ошибка: " + error);
//     }
// });