const http = require('http')
const express = require('express')
const app = express()
const status = require('http-status')
const conexao = require('./src/database/database')
const routes = require('./src/routes/routes')
const cors = require('cors')
const path = require('path')

app.use('/sistema/produtos/files', express.static(path.resolve(__dirname, "public", "upload")))

app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['X-PINGOTHER', 'Content-Type', 'Authorization']
}))


app.use(express.json())

app.use('/sistema', routes)

app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send("Page not found")
})

app.use((req, res, next) => {
    res.status.app(status.INTERNAL_SERVER_ERROR).json({ error })
})

conexao.sync({ force: false }).then(() => {
    const port = 3003
    app.set('port', port)
    const server = http.createServer(app)
    server.listen(port)
})