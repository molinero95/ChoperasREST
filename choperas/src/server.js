import express from "express"
import bodyParser from "body-parser"
const server = express()
const PORT = 8888

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.get("/system/health", (request, response) => {
    response.send({"status": "UP"})
})

server.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`)
})

export default server