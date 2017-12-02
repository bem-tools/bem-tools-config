const BemConfig = require('@bem/sdk.config');

module.exports = function() {
    const config = BemConfig();

    return Promise.all([
        config.get(),
        config.levelMap()
    ]).then(([all, levels]) => ({
        all,
        levels
    }));
};
