import fs from "fs";
import { expect } from "chai";
import sinon from "sinon";
import Configuration from "../src/configuration.js";
import {loadConfigurationFromFile} from "./../src/loadConfiguration.js";

describe("load configuration", ()=> {
    it("should load configuration from config.json file", () => {
        sinon.stub(fs, "readFileSync").returns("{\"test\": \"value\"}");

        loadConfigurationFromFile();
        expect(Configuration.getConfiguration()).is.deep.equal({"test": "value"});
    });
});