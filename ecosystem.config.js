module.exports = {
  apps: [
    {
      name: 'dev-mode',
      script: './server/index.js',
      watch: true,
      env: {
        'NODE_ENV': 'development'
      }
    }, {
      name: 'pro-mode',
      instances: 2,
      script: './server/index.js',
      env: {
        'NODE_ENV': 'production'
      }
    }
  ]
}
