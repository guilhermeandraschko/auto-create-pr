
const get2ParamsCase = (argsarray) => {
    if (argsarray[1] == 'draft') {
        return {branch: argsarray[0], jiracard: argsarray[0], draft: argsarray[1]};
    }
    return {branch: argsarray[0], jiracard: argsarray[1], draft: null};
}

const getCommandLineArgs = () => {
    const argsarray = process.argv.slice(2);
    switch (argsarray.length) {
        case 2: return get2ParamsCase(argsarray);
        case 3: return {branch: argsarray[0], jiracard: argsarray[1], draft: argsarray[2]};
        default: return {branch: argsarray[0], jiracard: argsarray[0], draft: null};
    }
}

export default getCommandLineArgs;