const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();

client.connect(12345, 'localhost', () => {
  console.log('Connected to server at localhost:12345');

  rl.question('Enter your username: ', (username) => {
    client.write(username);

    client.on('data', (data) => {
      console.log(data.toString());
    });

    rl.on('line', (input) => {
      client.write(input);

      if (input === '/q') {
        client.end();
        rl.close();
      }
    });
  });
});
