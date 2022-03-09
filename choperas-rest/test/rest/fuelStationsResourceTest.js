import { expect } from "chai";
import sinon from "sinon";
import FuelStationsRepository from "../../src/domain/fuelStationsRepository.js";
import FuelStationsResource from "../../src/rest/fuelStationsResource.js";


describe("/api/fuel-stations", () => {

    let status, json, getJson, getStatus, request, response, fuelStationsRepository, fuelStationsResource;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        getJson = () => json.args[0][0];
        getStatus = () => status.args[0][0];
        response = { json, status, getStatus, getJson };
        request = {};
        status.returns(response);
        fuelStationsRepository = new FuelStationsRepository();
        fuelStationsResource = new FuelStationsResource(fuelStationsRepository);
    });

    describe("get fuel stations without data present", () => {

        it("It should return http status 204 NO_CONTENT", () => {
            sinon.stub(fuelStationsRepository, "getFuelStations").returns([]);
            fuelStationsResource.getFuelStations(request, response);

            expect(response.getStatus()).to.be.equal(204);
        });

        it("It should return a body with empty data", () => {
            sinon.stub(fuelStationsRepository, "getFuelStations").returns([]);
            fuelStationsResource.getFuelStations(request, response);

            expect(response.getJson()).to.be.deep.equal({ "data": [] });
        });

    });

    describe("get fuel stations with data present", () => {

        it("It should return http status 200 OK", () => {
            const fuelStation = sinon.stub();
            sinon.stub(fuelStationsRepository, "getFuelStations").returns([fuelStation]);
            fuelStationsResource.getFuelStations(request, response);

            expect(response.getStatus()).to.be.equal(200);
        });

        it("It should return the expected value", () => {
            const fuelStation = sinon.stub();
            sinon.stub(fuelStationsRepository, "getFuelStations").returns([fuelStation]);
            fuelStationsResource.getFuelStations(request, response);

            expect(response.getJson()).to.be.deep.equal({ "data": [fuelStation] });
        });
    });
});