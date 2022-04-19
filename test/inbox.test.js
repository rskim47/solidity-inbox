const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// Creating instance of Web3
const web3 = Web3(ganache.provider()); // the provider is a comms layer

beforeEach(() => {
  // Get a list of all accounts
  web3.eth.getAccounts();

  // Use 1 account to deploy contract
});