import mysql from "mysql";

export default class Datasource {
    constructor(host, database, user, password, maxConnections) {
        this.database = database;
        this.maxConnections = maxConnections;
        this.host = host;
        this.user = user;
        this.password = password;
    }

    initializePool() {
        this.connectionPool = mysql.createPool({
            database: this.database,
            connectionLimit: this.maxConnections,
            host: this.host,
            user: this.user,
            password: this.password
        });
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((error, connection) => {
                if(error){
                    reject(error);
                }
                resolve(connection);
            });
        });
    }

    runQuery(query, parameters) {
        return new Promise((resolve, reject) => {
            this.connectionPool.query(query, parameters, (error, data) => {
                if(error){
                    reject(error);
                }
                resolve(data);
            });
        });
    }
}