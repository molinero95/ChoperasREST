export default class FuelStationsRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }

    getFuelStations() {
        return new Promise((resolve, reject) => {
            this.datasource.runQuery("SELECT * FROM gasolineras", [])
                .then((dbResponse) => {
                    resolve(dbResponse);
                }, (error) => {
                    reject(error);
                });
        });
    }
}