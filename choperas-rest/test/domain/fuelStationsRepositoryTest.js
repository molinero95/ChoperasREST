import FuelStationsRepository from "./../../src/domain/fuelStationsRepository.js";
import { expect } from "chai";
import sinon from "sinon";
import Datasource from "../../src/domain/datasource.js";

describe("Fuel station repository", () => {

    describe("get fuel stations", () => {

        it("It should return the expected data", () => {
            const dataSource = new Datasource();
            const expectedValue = "expectedValue";
            sinon.stub(dataSource, "runQuery").returns(Promise.resolve(expectedValue));

            const fuelStationsRepository = new FuelStationsRepository(dataSource);

            return fuelStationsRepository.getFuelStations().then((dbResponse) => {
                expect(dbResponse).to.be.equal(expectedValue);
            });
        });

        it("It should return the query error", () => {
            const dataSource = new Datasource();
            const expectedError = new Error("Query error");
            sinon.stub(dataSource, "runQuery").returns(Promise.resolve(expectedError));

            const fuelStationsRepository = new FuelStationsRepository(dataSource);

            return fuelStationsRepository.getFuelStations().catch((error) => {
                expect(error).to.be.equal(expectedError);
            });
        });

        it("It should execute the  expected query", () => {
            const dataSource = new Datasource();
            const runQueryStub = sinon.stub(dataSource, "runQuery").returns(Promise.resolve());

            const fuelStationsRepository = new FuelStationsRepository(dataSource);

            return fuelStationsRepository.getFuelStations().then(() => {
                expect(runQueryStub.calledOnceWithExactly("SELECT * FROM gasolineras", [])).is.true;
            });
        });
    });
});