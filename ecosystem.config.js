module.exports = {
  apps: [{
    name: 'Just Do It',
    script: 'app.js',
    interpreter: 'node@14.19.3',
    exec_interpreter: '/home/xerox/.nvm/versions/node/v14.19.3/bin/node',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    development: {
      user: 'xerox',
      host: 'omni.barkani.com',
      ref: 'origin/dev',
      repo: 'git@github.com:tsgold8899/twilio-speaker-conference.git',
      path: '/var/www/sites/twilio-speaker-conference',
      'post-deploy': 'export NVM_DIR=/home/xerox/.nvm; . $NVM_DIR/nvm.sh; nvm use 14.19.3; npm install; pm2 reload ecosystem.config.js --env development'
    },
  }
};
