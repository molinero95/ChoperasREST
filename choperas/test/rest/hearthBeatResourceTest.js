import chai, { expect } from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import HearthBeatResource from "../../src/rest/hearthBeatResource.js";

chai.use(chaiHttp)

describe("Application startup", () => {

    let status, json, getJson, getStatus, request, response, hearthBeatResource
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        getJson = () => json.args[0][0];
        getStatus = () => status.args[0][0];
        response = { json, status, getStatus, getJson };
        request = {}
        status.returns(response);
        hearthBeatResource = new HearthBeatResource();
    });

    it("It should return http status 200 OK", () => {
        hearthBeatResource.getHealth(request, response)

        expect(response.getStatus()).to.be.equal(200);
    })

    it("It should return the expected body status", () => {
        hearthBeatResource.getHealth(request, response)

        expect(response.getJson()).to.be.deep.equal({ "status": "UP" });
    })
})