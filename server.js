const net = require('net');

const clients = {};
const server = net.createServer();

server.on('connection', (client) => {
  client.write('Enter your username: ');

  client.on('data', (data) => {
    if (!clients[client]) {
      const username = data.toString().trim();
      clients[client] = username;
      console.log(`${username} connected from: ${client.remoteAddress}:${client.remotePort}`);
    } else {
      const message = data.toString().trim();
      console.log(`${clients[client]}: ${message}`);

      if (message === '/q') {
        console.log(`${clients[client]} disconnected.`);
        client.end();
        delete clients[client];
      }
    }
  });

  client.on('end', () => {
    const username = clients[client];
    console.log(`${username} disconnected.`);
    delete clients[client];
  });
});

server.listen(12345, () => {
  console.log('Server started. Listening on port 12345...');
});
