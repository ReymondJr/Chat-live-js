import express from 'express';
import logger from 'morgan'
import { Server, Socket } from 'socket.io';
import {createServer} from 'node:http'

const port = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

io.on('connection', (socket)=> {
    console.log('a user ha connected')

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on('chat message', (msg)=> {
        io.emit('chat message', msg)
        console.log('message: ' + msg)
    })
})
app.use(logger('dev'))

app.get('/', (req, res)=> {
    res.sendFile(process.cwd() + '/cliente/index.html')
})

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })