import FuelStationAssembler from "./fuelStationAssembler.js";

export default class FuelStationsResource {

    constructor(fuelStationsRepository) {
        this.fuelStationsRepository = fuelStationsRepository;
        this.fuelStationAssembler = new FuelStationAssembler();
    }

    async getFuelStations(_request, response) {
        return this.fuelStationsRepository.getFuelStations().then(fuelStations => {
            fuelStations.length === 0 ? response.status(204) : response.status(200);

            response.json({
                "data": fuelStations.map(fuelStation => this.fuelStationAssembler.convertToFuelStation(fuelStation))
            });
        });
    }
}   