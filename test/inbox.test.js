// Running local tests

// General libraries
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// Project import
const { interface, bytecode } = require('../compile');

// Creating instance of Web3
const web3 = new Web3(ganache.provider()); // the provider is a comms layer

const log = (content) => console.log(content);
const INITIAL_STRING = "Hi there!"
let accounts, inbox;

// Pre-test: Creating contract 
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use 1 account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [ INITIAL_STRING ] })
    .send({ from: accounts[ 0 ], gas: '1000000' });
});

// Test Specification
describe('Inbox', () => {
  it('deploys a contract', () => {
    // Checking for existence 
    assert.ok(inbox.options.address);
  });

  it('has proper default message', async () => {
    // Calling the GET message function in the inbox contract
    const message = await inbox.methods.message().call();
    assert.equal(INITIAL_STRING, message);
  });

  it('can change the message', async () => {

    // Changing the variable
    await inbox.methods.setMessage('bye').send({ from: accounts[ 0 ] });
    // Retrieving the variable 
    const message = await inbox.methods.message().call();
    assert.equal('bye', message);
  });
});