import FuelStationAssembler from "../../src/rest/fuelStationAssembler.js";
import chai from "chai";

describe("Fuel station assembler", () => {
    describe("convert to fuel station", () => {
        const expectedData = { "id": 1, "name": "test_fuel_station" };
        const fuelStationAssembler = new FuelStationAssembler();
        const fuelStation = fuelStationAssembler.convertToFuelStation({ "id": 1, "rotulo": "test_fuel_station" });
        it("It should contain the expected id", () => {
            chai.assert.equal(fuelStation.id, expectedData.id);
        });

        it("It should contain the expected name", () => {
            chai.assert.equal(fuelStation.name, expectedData.name);
        });
    });
});