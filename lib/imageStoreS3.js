// const fileStore = require('./imageStoreFile')

// function save (name, base64String) {
//   const imageData = base64String.split('data:image/png;base64,')[1]
//   return fileStore.save(name, imageData)
// }

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.save = (name, data) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'tfg-nextjs',
            Key: `pizzas/${name}.png`,
            Body: Buffer.from(data, 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        }

        s3.putObject(params, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(`//tfg-nextjs.s3.us-east-2.amazonaws.com/${params.Key}`)
            }
        })


    })
 }
