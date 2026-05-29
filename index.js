const { Client } = require('whatsapp-web.js');
const qrcode =require ('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot conectado!');
});

client.on ('message', async (message) => {
    if (message.body ==='!ping') {
        message.reply('Pong!');
    }
    if (message.body === '!menu') {
    message.reply(`
🤖 BOT NU

📌 Comandos:

!ping
!menu
!dado
`);
}

if (message.body === '!dado') {
    const numero = Math.floor(Math.random() * 6) + 1;
    message.reply(`🎲 Você tirou ${numero}`);
}
const texto = message.body.toLowerCase();

if (
    texto.includes('karyne') ||
    texto.includes('mc') ||
    texto.includes('mclaren')
) {
    await message.react('👑');
}
});
client.initialize();