import * as dotenv from "dotenv"
import { createServer } from "http";
import app from "./app.js";
import config from "./config/index"

dotenv.config()


const server =  createServer(app)


server.listen(config.port, () =>{
    console.log(`server is live on port http://localhost:${config.port}`)
})