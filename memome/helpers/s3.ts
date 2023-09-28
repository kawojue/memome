import awsCredentials from '../configs/aws.config'
import {
    DeleteObjectCommand, DeleteObjectCommandInput,
    S3Client, PutObjectCommand, PutObjectCommandInput,
} from '@aws-sdk/client-s3'

const s3: S3Client = new S3Client(awsCredentials)

const { BUCKET_NAME } = process.env

const uploadS3 = async (buffer: Buffer, path: string, type?: string): Promise<void> => {
    const params: PutObjectCommandInput = {
        Key: path,
        Body: buffer,
        ContentType: type,
        Bucket: BUCKET_NAME!,
    }
    const command: PutObjectCommand = new PutObjectCommand(params)
    await s3.send(command)
}

const deleteS3 = async (path: string): Promise<void> => {
    const params: DeleteObjectCommandInput = {
        Key: path,
        Bucket: BUCKET_NAME!,
    }
    const command: DeleteObjectCommand = new DeleteObjectCommand(params)
    await s3.send(command)
}

const getS3 = async (path: string): Promise<string> => `${process.env.DIST_DOMAIN!}/${path}`

export default s3
export { uploadS3, deleteS3, getS3 }