const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
};

module.exports = {
    devServer: {
        port: 8081,
    },


    chainWebpack: config => {

        config.resolve.alias
            .set('@', resolve('src'))
            .set('@a', resolve('src/assets'))
            .set('@s', resolve('src/styles'))
            .set('@v', resolve('src/views'))
            .set('@c', resolve('src/components'))
            .set('@n', resolve('src/network'))
            .set('common', resolve('src/components/common'))
            .set('content', resolve('src/components/content'))

    },
};