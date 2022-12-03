import * as fs from "fs";

 const readConfigFile = () => {
    const configFile = fs.readFileSync('.config', 'utf-8');
    const lines = configFile.split('\n');
    return lines.reduce((argsmap, line) => {
            let argmap = line.split('=');
            let key = argmap[0]?.trim();
            let value = argmap[1]?.trim();
            return {...argsmap, [key]: value};
        }, {});
}

export default readConfigFile;