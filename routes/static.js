module.exports = handlers => ({
  method: 'GET',
  path: '//tfg-nextjs.s3.us-east-2.amazonaws.com/{param*}',
  handler: {
    directory: {
      path: 'assets'
    }
  },
  options: {
    auth: false
  }
})
