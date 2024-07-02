const { Client } = require('whatsapp-web.js');

const client = new Client();

client.initialize();

client.on('qr', (qr) => {
  console.log('QR Code:', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  if (message.body.startsWith('!d')) {
    const args = message.body.split(' ');
    const diceRoll = rollDice(args[1], args[2]);
    client.sendMessage(message.from, `Você rolou ${diceRoll}!`);
  } else if (message.body.startsWith('!ficha')) {
    const ficha = getFicha();
    client.sendMessage(message.from, ficha);
  }
});

function rollDice(sides, rolls) {
  const results = [];
  for (let i = 0; i < rolls; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results.join(', ');
}

function getFicha() {
  // Aqui você pode colocar a lógica para gerar a ficha
  // Por exemplo, você pode usar uma API ou um banco de dados
  return 'Ficha:\nNome: John Doe\nClasse: Guerreiro\nNível: 5';
}

client.on('auth_failure', () => {
  console.log('Authentication failure!');
});