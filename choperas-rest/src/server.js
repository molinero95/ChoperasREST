import express from "express";
import bodyParser from "body-parser";
import ChoperasResource from "./rest/choperasResource.js";
import HearthBeatResource from "./rest/hearthBeatResource.js";
import ChoperasRepository from "./domain/choperasRepository.js";

const server = express();
const PORT = 8888;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const choperasRepository = new ChoperasRepository();
const choperasResource = new ChoperasResource(choperasRepository);

const choperasRouter = express.Router();
choperasRouter.get("/", choperasResource.getChoperas);

const hearthBeatResource = new HearthBeatResource();
const hearthBeatRouter = express.Router();
hearthBeatRouter.get("/", hearthBeatResource.getHealth);

server.use("/api/choperas", choperasRouter);
server.use("/system/health", hearthBeatRouter);


server.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});

export default server;