import express from "express";
import bodyParser from "body-parser";
import FuelStationsResource from "./rest/fuelStationsResource.js";
import HearthBeatResource from "./rest/hearthBeatResource.js";
import FuelStationsRepository from "./domain/fuelStationsRepository.js";
import { loadConfigurationFromFile } from "./loadConfiguration.js";
import Datasource from "./domain/datasource.js";
import Configuration from "./configuration.js";


loadConfigurationFromFile();
const configuration = Configuration.getConfiguration();
const dataSource = new Datasource(
    configuration.db.host,
    configuration.db.database,
    configuration.db.user,
    configuration.db.password,
    configuration.db.maxConnections
);

dataSource.initializePool();
const fuelStationsRepository = new FuelStationsRepository(dataSource);
const fuelStationResource = new FuelStationsResource(fuelStationsRepository);
const hearthBeatResource = new HearthBeatResource();

const server = express();
const PORT = 8888;

const fuelStationsRouter = express.Router();
fuelStationsRouter.get("/", (request, response) => fuelStationResource.getFuelStations(request, response));
server.use("/api/fuel-stations", fuelStationsRouter);

const hearthBeatRouter = express.Router();
hearthBeatRouter.get("/", (request, response) => hearthBeatResource.getHealth(request, response));
server.use("/system/health", hearthBeatRouter);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});

export default server;