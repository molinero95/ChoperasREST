export default class FuelStationAssembler{
    convertToFuelStation(data){
        return {
            "id": data.id,
            "name": data.rotulo
        };
    }
}