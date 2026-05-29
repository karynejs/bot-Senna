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
if (message.body === '!fechar') {
    const chat = await message.getChat();

    if (chat.isGroup) {
        await chat.setMessagesAdminsOnly(true);
        message.reply('🔒 Grupo fechado!');
    }
}

if (message.body === '!abrir') {
    const chat = await message.getChat();

    if (chat.isGroup) {
        await chat.setMessagesAdminsOnly(false);
        message.reply('🔓 Grupo aberto!');
    }
}
if (message.body.startsWith('!ban')) {

    const chat = await message.getChat();

    if (!chat.isGroup) {
        return message.reply('❌ Este comando só funciona em grupos.');
    }

    const author = message.author || message.from;

    const admins = chat.participants.filter(p => p.isAdmin || p.isSuperAdmin);

    const isAdmin = admins.some(admin => author.includes(admin.id.user));

    console.log('AUTHOT:', author);
    console.log('ADMINS:', admins.map(a => a.id._serialized));
    if (!isAdmin) {
        return message.reply('❌ Apenas administradores podem usar este comando, porra.');
    }

    const mentionedUsers = message.mentionedIds;

    if (!mentionedUsers.length) {
        return message.reply('❌ Marque alguém para banir, sua bura.');
    }

    await chat.removeParticipants(mentionedUsers);

    message.reply('🚫 Membro removido, rs.');
}
});
client.initialize();