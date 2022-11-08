const path = require('path');
module.exports = {
    webpack: {
        configure: {
            target: 'electron-renderer'
        },
        alias: {
            '@public' : path.resolve(__dirname,'public'),
            '@src': path.resolve(__dirname, 'src'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@interface':path.resolve(__dirname,'public/interface')
        },
    }
};