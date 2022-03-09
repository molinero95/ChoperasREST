export default class FuelStationsResource {

    constructor(fuelStationsRepository) {
        this.fuelStationsRepository = fuelStationsRepository;
    }

    async getFuelStations(_request, response) {
        return this.fuelStationsRepository.getFuelStations().then(fuelStations => {
            if (fuelStations.length === 0) {
                response.status(204);
            }
            else{
                response.status(200);
            }
            response.json({ "data": fuelStations });
        });
        
    }

}   