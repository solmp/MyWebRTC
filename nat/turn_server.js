// 建立TURN服务器
const Turn = require('node-turn');
const server = new Turn({
  authMech: 'long-term',
  listeningIps: ['0.0.0.0'],    // 内网IP
  relayIps: ['0.0.0.0'],        // 内网IP
  externalIps: ['xx.xx.xx.xx'], // 公网IP
  listeningPort: 3478,
  credentials: {
    username: "password"
  },
  debugLevel: 'DEBUG',
});

server.on('listening', () => {
  const address = server.getListeningIps()[0];
  console.log('TURN server listening on ' + address.address + ':' + address.port);
});

server.start()

// 测试(Linux)：sudo apt install coturn
// turnutils_stunclient 172.23.192.1
// Server is listening on 0.0.0.0:3478
// Receiving UDP: from IPV4://172.23.202.69:49293 to IPV4://0.0.0.0:3478 binding request TransactionID: 0f5cecad5ee2aebbd5efe40b
// Sending UDP: from IPV4://0.0.0.0:3478 to IPV4://172.23.202.69:49293 binding success TransactionID: 0f5cecad5ee2aebbd5efe40b
// xor-mapped-address: IPV4://172.23.202.69:49293

// 0: IPv4. UDP reflexive addr: 172.23.202.69:47467
