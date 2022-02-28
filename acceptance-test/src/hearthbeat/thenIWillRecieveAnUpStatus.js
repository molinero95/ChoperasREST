const { Then } = require('@cucumber/cucumber')
const { assert } = require('chai');  

 
Then('I will recieve an UP status', function() {
    const data = CucumberContex.get("response");

    assert.equal({"status": "UP"}, expectedData);
});