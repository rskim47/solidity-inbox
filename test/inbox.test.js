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

let accounts, inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use 1 account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [ 'Hi there!' ] })
    .send({ from: accounts[ 0 ], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    log(inbox)

  });
});