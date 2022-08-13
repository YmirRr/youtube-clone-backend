module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660228223964_6483'

  // add your middleware config here
  config.middleware = ['errorHandler']

  config.security = {
    csrf: {
      enable: false,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/youtube-clone',
      options: {
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  }

  config.jwt = {
    secret: '7e4d11a8-ba75-4dea-b2cf-416a50e144e5',
    expiresIn: '1d',
  }

  return {
    ...config,
    ...userConfig,
  }
}
