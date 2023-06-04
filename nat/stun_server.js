// 建立STUN服务器
const stun = require('stun');
const server = stun.createServer({ type: 'udp4' });

const { STUN_BINDING_RESPONSE, STUN_EVENT_BINDING_REQUEST } = stun.constants;
const userAgent = `node/${process.version} stun/v1.0.0`;

server.on(STUN_EVENT_BINDING_REQUEST, (request, rinfo) => {
  const message = stun.createMessage(STUN_BINDING_RESPONSE);

  message.addXorAddress(rinfo.address, rinfo.port);
  message.addSoftware(userAgent);

  server.send(message, rinfo.port, rinfo.address);
});

server.listen(3478, () => {
  console.log('[stun] server started on port 3478');
});

// 测试(Linux)：sudo apt install coturn
// turnutils_stunclient 172.23.192.1

// 0: IPv4. UDP reflexive addr: 172.23.202.69:50727

// ******************************************************
// 使用第三方STUN服务器
// const stun = require('stun');
// stun.request('stun.l.google.com:19302', (err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const { address } = res.getXorAddress();
//     console.log('4your ip', address);
//   }
// });
