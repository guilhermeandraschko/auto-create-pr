const getParamsWithVar = (argsarray) => {
    return argsarray.slice(1).reduce((acc, arg) => {
        const [first, ...rest] = arg.split("=");
        const remaining = rest.join("=");
        return {...acc, [first]: remaining}
    }, {});
}

const buildCommandLineWithVar = (argsarray) => {
    const params = getParamsWithVar(argsarray);
    if (!params?.jiracard) {
        return {...params, jiracard: params.branch};
    }
    return params;
}
export default buildCommandLineWithVar;