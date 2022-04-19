// Compiles the sol file and exports 
const path = require('path');
const fs = require('fs');
const solc = require('solc')

// Accessing the file on harddrive
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Logging function 
const log = (content) => console.log(content)
//log(solc.compile(source, 1));

// Exporting Inbox Contract
module.exports = solc.compile(source, 1).contracts[ ':Inbox' ];