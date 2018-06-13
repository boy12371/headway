import * as AWS from 'aws-sdk'
import { AWS_CONFIG, S3_BUCKET } from './constants'
AWS.config.update(AWS_CONFIG)

export const s3 = new AWS.S3()

export const getSignedUrl = (filename, filetype) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Expires: 60,
      ContentType: filetype
    }
    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        console.log(err)
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}

s3.listBuckets((err, data) => {
  console.log(err || data)
})
