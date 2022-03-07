const { Then } = require('@cucumber/cucumber')
const { assert } = require('chai');  
const CucumberContext = require("../cucumberContext")

 
Then('I will recieve an UP status', function() {
    CucumberContext.get("response").then(result => {
            assert.deepStrictEqual({"status": "UP"}, JSON.parse(result.body))
        });
});