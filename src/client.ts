import * as net from 'net';

if(process.argv.length <= 3) {
    console.log('Please, provide a command.');
}

const client = net.connect({port: 60300});

client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());

    if(message.type === 'add') {}
    else if(message.type === 'update') {}
    else if(message.type === 'remove') {}
    else if(message.type === 'read') {}
    else if(message.type === 'list') {}
    else {
        console.log('Message type' + message.type + 'is not valid');
    }
});