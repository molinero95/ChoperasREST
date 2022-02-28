const { Then } = require('@cucumber/cucumber')
const { assert } = require('chai');  

 
Then('I will recieve the following fuel station data:', function(expectedData) {
    const data = CucumberContex.get("response");

    assert.equal(data, expectedData);
});