const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const options = {
	endpoint: process.env.BACKBLAZE_ENDPOINT,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_BUCKET_REGION,
	bucket: process.env.AWS_BUCKET_NAME
}

const urlBase = `https://${options.bucket}.${options.endpoint}`
const endpoint = `https://${options.endpoint}`

const s3 = new S3Client({
	region: options.region,
	endpoint: endpoint,
	credentials: {
		accessKeyId: options.accessKeyId,
		secretAccessKey: options.secretAccessKey
	}
})

const uploadFile = async (name, mimetype, buffer) => {
	const path = 'uploads'

	const file = new PutObjectCommand({
		Bucket: options.bucket,
		Key: `${path}/${name}`,
		Body: buffer,
		ContentType: mimetype
	})

	await s3.send(file)

	return `${urlBase}/${path}/${name}`
}

const deleteFile = async (name) => {
	const path = 'uploads'

	const file = new DeleteObjectCommand({
		Bucket: options.bucket,
		Key: `${path}/${name}`
	})

	await s3.send(file)
}

module.exports = {
	uploadFile,
	deleteFile
}