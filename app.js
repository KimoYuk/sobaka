let express = require('express')
let app = express()
let WebSocket = require('ws')
const port = process.env.PORT || 8000;
let otzyvs = []
let clients = []

app.use('/', express.static('./public'))
app.get('/hello', function (req, res) {
    let otzyv = req.query.message
    otzyvs.push(otzyv)
    for (client of clients) {
         client.send(JSON.stringify(otzyv)) // JSON.stringify(messages) - преобразуем массив сообщений в строку
    }
    res.send('ok')
})
app.get('/add', function(req, res){
    res.send(otzyvs)
    console.log(otzyvs)
})
app.listen(port)

let wsServer = new WebSocket.Server({port: 3001})
wsServer.on('connection', function(ws){
     clients.push(ws)
 })