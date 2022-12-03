import throwExceptionIfInvalidCommands from "./throw-exception-if-invalid-commands.js";

let count = 1;
let commands = {}

// Should fail for missing branch inside commands
try { 
    throwExceptionIfInvalidCommands(commands);
    console.log(`Failed! (${count++})`);
} catch (e) {
    console.log(`Success! (${count++})`);
}

// Should success
commands = {branch : "my-branch"};
try { 
    throwExceptionIfInvalidCommands(commands);
    console.log(`Success! (${count++})`);
} catch (e) {
    console.log(`Falhou! (${count++})`);
}

// Should fail for empty branch name
commands = {branch : "  "};
try { 
    throwExceptionIfInvalidCommands(commands);
    console.log(`Falhou! (${count++})`);
} catch (e) {
    console.log(`Success! (${count++})`);
}
