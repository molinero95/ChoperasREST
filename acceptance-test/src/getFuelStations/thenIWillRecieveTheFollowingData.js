const { Then } = require('@cucumber/cucumber')
const { assert } = require('chai');
const CucumberContext = require("../cucumberContext")


Then('I will recieve the following fuel station data:', function (dataTable) {
    const expectedData = assembleDataTable(dataTable);

    console.log(expectedData)

    return CucumberContext.get("response").then((result) => {
        console.log(result.body)
        assert.deepStrictEqual(expectedData,  JSON.parse(result.body))
    });
});

function assembleDataTable(dataTable) {
    const dataTableAsMap = dataTable.rowsHash()
    return {
        "data": [{
            "id": Number(dataTableAsMap["data.id"]),
            "name": dataTableAsMap["data.name"]
        }]
    }
}