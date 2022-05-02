import * as net from 'net';
import { watchFile } from 'fs';
import { Note } from './Note';

export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    title?: string;
    body?: string;
    color?: 'green' | 'red';
}
  
export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
}

if (process.argv.length !== 3) {
  console.log('Please, provide a filename.');
} 
else {
    const fileName = process.argv[2];

    net.createServer((connection) => {
        console.log('A client has connected.');

        connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) +
        '\n');

        watchFile(fileName, (curr, prev) => {
        connection.write(JSON.stringify({
            'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
            '\n');
        });

        connection.on('data', (dataJSON) => {
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

        connection.on('close', () => {
            console.log('A client has disconnected.');
        });
    }).listen(60300, () => {
        console.log('Waiting for clients to connect.');
    });
}