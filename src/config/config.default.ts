module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539671912752_2826';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'vlog',
    dialect: 'mysql',
  };

  config.weapp = {
    appId: 'wx7e1b1178f0bfab87',
    appSecret: 'e3ab684fc8e854c7f0080e81ed390ce0'
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  };

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.multipart = {
    mode: 'file',
    fileSize: '50mb',
  };

  // close csrf for unit test
  config.security = {
    csrf: false,
  };

  return config;
};
