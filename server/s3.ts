import * as AWS from 'aws-sdk'
import { AWS_CONFIG } from './constants'
AWS.config.update(AWS_CONFIG)
export const s3 = new AWS.S3()
