import Datasource from "../../src/domain/datasource.js";
import sinon from "sinon";
import mysql from "mysql";
import { expect } from "chai";

describe("Datasource test", () => {
    const host = "localhost";
    const database = "database";
    const connections = 10;
    const user = "user";
    const password = "pass";
    const datasource = new Datasource(host, database, user, password, connections);

    afterEach(() => {
        sinon.restore();
    });

    describe("configuration", () => {
        it("It should connect with the expected parameters", () => {
            const mock = sinon.mock(mysql);
    
            mock.expects("createPool")
                .once()
                .withExactArgs({
                    host: host,
                    database: database,
                    connectionLimit: connections,
                    user: user,
                    password: password
                });
    
            datasource.initializePool();
            mock.verify();
        });
    });

    describe("get connection", () => {
        it("It should get the connection from pool", () => {
            const poolFake = { getConnection: () => { } };
            const getConnectionStub = sinon.stub(poolFake, "getConnection");
    
            sinon.stub(mysql, "createPool").returns(poolFake);
            datasource.initializePool();
    
            datasource.getConnection();
            expect(getConnectionStub.calledOnce).to.be.true;
        });
    
        it("It should resolve if connection is stablished", () => {
            const expectedConnection = { "number": 1 };
            const poolFake = { getConnection: (_onError, onConnect) => { onConnect(expectedConnection); } };
    
            sinon.stub(mysql, "createPool").returns(poolFake);
            datasource.initializePool();
    
            datasource.getConnection().then(connection => {
                expect(connection).is.equal(expectedConnection);
            });
        });
    
        it("It should reject if connection is not stablished", () => {
            const expectedError = new Error("something is wrong");
            const poolFake = { getConnection: (onError) => { onError(expectedError); } };
    
            sinon.stub(mysql, "createPool").returns(poolFake);
            datasource.initializePool();
    
            datasource.getConnection().catch(rejection => {
                expect(rejection).is.equal(expectedError);
            });
        });
    });

    describe("run query", () => {
        it("It should resolve the expected value", () => {
            const expectedResponseData = "test data";
            const poolFake = {  query: (options, values, callback) => { callback(null, expectedResponseData); }};
   
            sinon.stub(mysql, "createPool").returns(poolFake);
            datasource.initializePool();
    
            return datasource.runQuery("", []).then(responseData =>{
                expect(responseData).to.be.equal(expectedResponseData);
            });
        });


        it("It should reject with the query error", () => {
            const queryError = new Error("Query error");
            const poolFake = {  query: (options, values, callback) => { callback(queryError, null); }};
   
            sinon.stub(mysql, "createPool").returns(poolFake);
            datasource.initializePool();
    
            return datasource.runQuery("", []).catch(responseData =>{
                expect(responseData).to.be.equal(queryError);
            });
        });

    });

});