import { getHealth } from '../choperasClient';
const { When } = require('@cucumber/cucumber')
const request = require('request')
 
When('I request a heartbeat from the service', function() {
    CucumberContex.add("response", getHealth());
});