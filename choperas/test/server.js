import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../src/server.js";

chai.use(chaiHttp)

describe("Application startup", () => {
    it("It should return http status 200 OK", () => {
        chai.request(server)
        .get("/system/health")
        .end((error, response) => {
            expect(response).to.have.status(200)
        })
    })
    it("It should returna json body", () => {
        chai.request(server)
        .get("/system/health")
        .end((error, response) => {
            expect(response).to.be.json
        })
    })

    it("It should returna the expected body status", () => {
        chai.request(server)
        .get("/system/health")
        .end((error, response) => {
            expect(response.body.status).to.equal("UP")
        })
    })
})