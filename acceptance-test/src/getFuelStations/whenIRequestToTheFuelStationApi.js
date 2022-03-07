const { getChoperas } = require('../choperasClient');
const { When } = require('@cucumber/cucumber')
const CucumberContext = require("../cucumberContext")

When('I request to the fuel station api for fuel stations', function () {
    CucumberContext.add("response", getChoperas());
});