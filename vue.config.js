const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
};

module.exports = {
    devServer: {
        port: 8081,
    },

    //  将接收ChainableConfig由webpack-chain提供支持的实例的函数。
    chainWebpack: config => {

        config.resolve.alias
            .set('@', resolve('src'))
            .set('@a', resolve('src/assets'))
            .set('@s', resolve('src/styles'))
            .set('@v', resolve('src/views'))
            .set('@c', resolve('src/components'))
            .set('@u', resolve('src/utils'))
            .set('common', resolve('src/components/common'))
            .set('content', resolve('src/components/content'))

    },
};