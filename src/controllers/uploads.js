const { uploadFile, deleteFile } = require("../services/s3")

const upload = async (req, res) => {
	const image = req.file

	const upload = await uploadFile(image.originalname, image.mimetype, image.buffer)

	return res.json(upload)
}

const deleteFileController = async (req, res) => {
	const imageDelete = req.params.name

	await deleteFile(imageDelete)

	return res.json('Imagem excluida com sucesso')
}

module.exports = {
	upload,
	deleteFileController
}