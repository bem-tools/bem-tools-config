const fs = require('fs');
const path = require('path');
const util = require('util');

const bemToolsConfig = require('.');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const CONFIG_DIR = '.bem-config';

function noOp() {}

module.exports = function() {
    this
        .title('Works with bem-config').helpful()
        .act(function(opts, args) {
            return Promise.all([
                bemToolsConfig(),
                mkdir(CONFIG_DIR).catch(err => {
                    if (err.code !== 'EEXIST') throw err;
                })
            ]).then(([confData]) => {
                return [
                    writeFile(path.join(CONFIG_DIR, 'index.json'), JSON.stringify(confData.all)),
                    writeFile(path.join(CONFIG_DIR, 'levels.json'), JSON.stringify(confData.levels)),
                ];
            }).then(noOp);
        })
        .end();
};
