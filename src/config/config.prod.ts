module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  config.sequelize = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'vlog',
    dialect: 'mysql',
  };

  return config;
};
