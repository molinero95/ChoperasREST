import fs from "fs";
import Configuration from "./configuration.js";


export function loadConfigurationFromFile(){
    const configuration = fs.readFileSync("./config/config.json");
    Configuration.setConfiguration(JSON.parse(configuration));
    console.log(Configuration.getConfiguration());
}

