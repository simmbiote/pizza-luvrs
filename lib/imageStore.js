const fileStore = require('./imageStoreFile')
const s3Store = require('./imageStoreS3')

function save (name, base64String) {
  const imageData = base64String.split('data:image/png;base64,')[1]
  // return fileStore.save(name, imageData)
  console.info("Attempting to save to S3")
  return s3Store.save(name, imageData)
}

module.exports = {
  save
}
