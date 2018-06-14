export const PASSWORD_OPTS = {
  uppercase: false,
  numbers: true,
  excludeSimilarCharacters: true,
}

export const SALT_ROUNDS = 10

export const PORT = process.env.PORT || 5000

export const AWS_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-2'
}

export const S3_BUCKET = 'headway'

export const UPLOAD_DIRECTORY = './uploads'
