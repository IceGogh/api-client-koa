module.exports = {
  apps: [
    {
      name: 'dev-mode',
      script: './server/index.js',
      env: {
        'NODE_ENV': 'development'
      }
    }, {
      name: 'pro-mode',
      script: './server/index.js',
      env: {
        'NODE_ENV': 'production'
      }
    }
  ]
}
