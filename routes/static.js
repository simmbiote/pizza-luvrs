module.exports = handlers => ({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'assets'
    }
  },
  options: {
    auth: false
  }
})
