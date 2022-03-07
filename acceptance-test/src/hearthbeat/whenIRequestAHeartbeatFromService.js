const { getHealth } = require('../choperasClient');
const { When } = require('@cucumber/cucumber')
const CucumberContext = require("../cucumberContext")

When('I request a heartbeat from the service', function() {
    CucumberContext.add("response", getHealth());
});