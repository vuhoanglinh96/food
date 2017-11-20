module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8546,   // Different than the default below
      from: "0x387908fd4f030c94f7f28ad61b1386d56c12f162"
    }
  }
};
