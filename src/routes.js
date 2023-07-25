const express = require('express')
const { upload, deleteFileController } = require('./controllers/uploads')
const multer = require('./middlewares/multer')

const routes = express()

routes.post('/upload', multer.single('image'), upload)
routes.delete('/upload/:name', deleteFileController)

module.exports = routes