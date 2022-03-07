const { Then } = require('@cucumber/cucumber')
const { assert } = require('chai');  
const CucumberContext = require("../cucumberContext")

 
Then('I will recieve the following fuel station data:', function(dataTable) {
    const expectedData = dataTable.rowsHash()
    return CucumberContext.get("response").then((result) => {
        assert.deepStrictEqual(expectedData, result.body)
    });
});