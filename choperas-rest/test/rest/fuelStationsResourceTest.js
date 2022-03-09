import { expect } from "chai";
import sinon from "sinon";
import FuelStationsRepository from "../../src/domain/fuelStationsRepository.js";
import FuelStationsResource from "../../src/rest/fuelStationsResource.js";
import FuelStationAssembler from "../../src/rest/fuelStationAssembler.js";

describe("/api/fuel-stations", () => {

    let jsonValue, statusValue, request, response, fuelStationsRepository, fuelStationsResource;
    
    beforeEach(() => {
        request = {};
        response = { json: (obj) => jsonValue=obj, status: (value) => statusValue=value };
        fuelStationsRepository = new FuelStationsRepository();
        fuelStationsResource = new FuelStationsResource(fuelStationsRepository);
    });

    describe("get fuel stations without data present", () => {

        it("It should return http status 204 NO_CONTENT", async () => {
            sinon.stub(fuelStationsRepository, "getFuelStations").returns(Promise.resolve([]));
            await fuelStationsResource.getFuelStations(request, response);
            expect(statusValue).is.equal(204);
        });

        it("It should return a body with empty data", async () => {
            sinon.stub(fuelStationsRepository, "getFuelStations").returns(Promise.resolve([]));
            await fuelStationsResource.getFuelStations(request, response);

            expect(jsonValue).to.be.deep.equal({ "data": [] });
        });

    });

    describe("get fuel stations with data present", () => {

        it("It should return http status 200 OK", async () => {
            const repositoryData = {"id": 1, "rotulo": "test"};
            sinon.stub(fuelStationsRepository, "getFuelStations").returns(Promise.resolve([repositoryData]));
            await fuelStationsResource.getFuelStations(request, response);

            expect(statusValue).to.be.equal(200);
        });

        it("It should return the expected value", async () => {
            const repositoryData = {"id": 1, "rotulo": "test", "more_arguments": ""};
            const fuelStation = {"id": 1, "name": "test"};
            const fuelStationAssembler = new FuelStationAssembler();
            sinon.stub(fuelStationsRepository, "getFuelStations").returns(Promise.resolve([repositoryData]));
            sinon.stub(fuelStationAssembler, "convertToFuelStation").returns(fuelStation);
            await fuelStationsResource.getFuelStations(request, response);

            expect(jsonValue).to.be.deep.equal({ "data": [fuelStation] });
        });
    });
});