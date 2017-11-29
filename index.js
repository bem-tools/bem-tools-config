const BemConfig = require('@bem/sdk.config');

module.exports = function() {
    return Promise.all([
        BemConfig().get(),
        BemConfig().levelMap()
    ]).then(([all, levels]) => ({
        all,
        levels
    }));
};
