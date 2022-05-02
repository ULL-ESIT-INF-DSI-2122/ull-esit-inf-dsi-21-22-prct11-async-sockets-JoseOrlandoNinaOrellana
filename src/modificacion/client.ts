import * as net from 'net';
import { Respond } from './server'

export type Request = {
    Command: string,
    Params: string[],
}

let wholeData: string = '';
let message: Respond;

if(process.argv.length <= 3) {
    console.log('Please, provide a command.');
}
else {
    const client = net.connect({port: 60300});
    let command: Request = {
        Command: process.argv[2],
        Params: [process.argv[3]],
    }

    client.write(JSON.stringify(command));

    client.on('data', (data) => {
        wholeData += data;
    });

    client.on('end', () => {
        message = JSON.parse(wholeData.toString());
        if(message.Error === '')
        {
            console.log(message.Result);
        }
        else
        {
            console.log('There was an error trying to excute: ');
            console.log(message.Error)
        }
    });
}
