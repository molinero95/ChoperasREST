import mysql from "mysql"

export default class Datasource {
    constructor(host, user, password, maxConnections) {
        this.maxConnections = maxConnections;
        this.host = host;
        this.user = user;
        this.password = password;
    }

    initializePool() {
        this.connectionPool = mysql.createPool({
            connectionLimit: this.maxConnections,
            host: this.host,
            user: this.user,
            password: this.password
        })
    }

    getConnection(callback) {
        this.connectionPool.getConnection(callback)
    }
}