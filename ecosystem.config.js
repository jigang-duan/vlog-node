module.exports = {
  apps : [{
    name: 'vlog-node',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'local'
    },
    env_production: {
      NODE_ENV: 'prod'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : 'vlog.jigangduan.xyz',
      ref  : 'origin/master',
      repo : 'https://github.com/jigang-duan/vlog-node.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
