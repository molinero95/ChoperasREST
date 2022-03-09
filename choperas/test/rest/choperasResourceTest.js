import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import ChoperasRepository from "../../src/domain/choperasRepository.js"
import ChoperasResource from "../../src/rest/choperasResource.js";

chai.use(chaiHttp)


describe("/api/choperas", () => {

    let status, json, getJson, getStatus, request, response, choperasRepository, choperasResource
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        getJson = () => json.args[0][0];
        getStatus = () => status.args[0][0];
        response = { json, status, getStatus, getJson };
        request = {}
        status.returns(response);
        choperasRepository = new ChoperasRepository();
        choperasResource = new ChoperasResource(choperasRepository);
    });

    describe("get choperas without data present", () => {

        it("It should return http status 204 NO_CONTENT", () => {
            sinon.stub(choperasRepository, "getChoperas").returns([])
            choperasResource.getChoperas(request, response)

            expect(response.getStatus()).to.be.equal(204);
        })

        it("It should return a body with empty data", () => {
            sinon.stub(choperasRepository, "getChoperas").returns([])
            choperasResource.getChoperas(request, response)

            expect(response.getJson()).to.be.deep.equal({ "data": [] });
        })

    })

    describe("get choperas with data present", () => {

        it("It should return http status 200 OK", () => {
            const chopera = sinon.stub()
            sinon.stub(choperasRepository, "getChoperas").returns([chopera])
            choperasResource.getChoperas(request, response)

            expect(response.getStatus()).to.be.equal(200);
        })

        it("It should return the expected value", () => {
            const chopera = sinon.stub()
            sinon.stub(choperasRepository, "getChoperas").returns([chopera])
            choperasResource.getChoperas(request, response)

            expect(response.getJson()).to.be.deep.equal({ "data": [chopera] });
        })
    })
})