const path = require('path')

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },  
  
  configureWebpack: {
        module: {
            rules: [
                process.env.NODE_ENV === 'production'
                    ? {
                          include: path.resolve('node_modules', 'miragejs'),
                          use: 'null-loader'
                      }
                    : {}
            ]
        }
    }
};
