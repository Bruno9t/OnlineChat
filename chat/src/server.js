const express = require('express')
const path = require('path')
const ejs = require('ejs')
const app  = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname,'page')))
app.set('views',path.join(__dirname,'page'))
app.engine('html',ejs.renderFile)
app.set('view engine','html')

app.get('/',(req,res)=>{
    res.render('index.html')
})
let messages = []
io.on('connection', socket => {
    console.log(`User connected : ${socket.id}`)
    socket.emit('preMess',messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('recMess',data)
    })
})

http.listen(3333,()=>{
    console.log('Server is running!')
})