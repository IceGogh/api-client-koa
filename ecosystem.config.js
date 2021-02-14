module.exports = {
  apps: [
    {
      name: 'x-dev-mode',
      script: './server/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'x-pro-mode',
      instances: 1,
      script: './server/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
