import Datasource from "../../src/domain/datasource.js"
import sinon from "sinon";
import mysql from "mysql"
import { expect } from "chai";

describe("Datasource configuration", () => {
    const host = "localhost";
    const connections = 10;
    const user = "user";
    const password = "pass";
    const datasource = new Datasource(host, user, password, connections);


    it("It should connect with the expected parameters", () => {
        const mock = sinon.mock(mysql)

        mock.expects("createPool")
            .once()
            .withExactArgs({
                host: host,
                connectionLimit: connections,
                user: user,
                password: password
            })

        datasource.initializePool()
        mock.verify()
    })

    it("It should get the connection from pool", () => {
        const poolFake = {getConnection: () => {}}
        const getConnectionStub = sinon.stub(poolFake, "getConnection")

        sinon.stub(mysql, "createPool").returns(poolFake);
        datasource.initializePool();

        datasource.getConnection((_err, _conn) => {});   
        expect(getConnectionStub.calledOnce).to.be.true

    })
})