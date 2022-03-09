const request = require('request');

function getHealth(){
    return new Promise((resolve, reject) => {
        request.get("http://127.0.0.1:8888/system/health", (error, response) => {
            error ? reject(error) : resolve(response);
        })
    })
}

function getFuelStations(){
    return new Promise((resolve, reject) => {
        request.get("http://127.0.0.1:8888/api/fuel-stations", (error, response) => {
            error ? reject(error) : resolve(response);
        })
    })
}


module.exports = {
    getFuelStations,
    getHealth
}