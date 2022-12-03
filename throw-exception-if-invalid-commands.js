const throwExceptionIfInvalidCommands = (commands) => {    
    if (!commands?.branch?.trim()) {
        throw Error('Branch name is required!');
    }
}
export default throwExceptionIfInvalidCommands;