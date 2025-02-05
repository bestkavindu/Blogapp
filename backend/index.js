const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRouter')
const upload = require('express-fileupload')

const {notFound, errorMiddleware} = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json({extend: true}))
app.use(express.urlencoded({extends: true}))
app.use(cors({credentials:true, origin: "http://localhost:3000"}))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.use(notFound)
app.use(errorMiddleware)

connect(process.env.MONGO).then(app.listen(5000,))
