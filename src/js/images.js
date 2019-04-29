const path = require('path'),
    fs = require('fs'),
    dir = './src/img/';

let result = [];

fs.readdirSync(path.resolve(dir)).forEach(file => {
    result.push(
        {
            src:     path.resolve(dir, file),
            dest:    'images/' + file,
        }
    );
});

module.exports = result;