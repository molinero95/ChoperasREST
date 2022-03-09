export default class FuelStationsResource {

    constructor(fuelStationsRepository) {
        this.fuelStationsRepository = fuelStationsRepository;
    }

    getFuelStations(_request, response) {
        const fuelStations = this.fuelStationsRepository.getFuelStations();
        if (fuelStations.length === 0) {
            response.status(204);
        }
        response.status(200);
        response.json({ "data": fuelStations });
    }

}