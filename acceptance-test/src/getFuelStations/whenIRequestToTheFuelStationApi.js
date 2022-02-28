import { getChoperas } from '../choperasClient';
const { When } = require('@cucumber/cucumber')
const request = require('request')

When('I request to the fuel station api for fuel stations', function () {
    CucumberContex.add("response", getChoperas());
});