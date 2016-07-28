var search = require('./Search.js'),
    query = process.argv.slice(2).join(' ');

search(query);
