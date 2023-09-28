const { BUCKET_REGION, AWS_SECRET_ID, AWS_ACCESS_SECRET } = process.env

const awsCredentials = {
    credentials: {
        accessKeyId: AWS_ACCESS_SECRET!,
        secretAccessKey: AWS_SECRET_ID!
    },
    region: BUCKET_REGION!
}

export default awsCredentials