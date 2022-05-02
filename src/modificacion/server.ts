import * as net from 'net';
import { spawn } from 'child_process';

export type Respond = {
    Result: string,
    Error?: string,
}

net.createServer((connection) => {
    connection.on('data', (data) => {
        let wholeData: string = '';
        let error: string = '';
        const command = JSON.parse(data.toString());
        console.log('Command received: ');
        console.log(command);
        const linuxCommad = spawn(command.Command, command.Params);

        linuxCommad.on('error', () => {
            error = 'The command doesnt exist';
        });

        linuxCommad.stdout.on('data', (data) => {
            wholeData += data;
        });

        linuxCommad.stderr.on('data', (data) => {
            error += data;
        });

        linuxCommad.on('close', () => {
            let res: Respond = {
                Result: wholeData,
                Error: error,
            }

            connection.write(JSON.stringify(res));
        });
    });
    connection.on('end', () => {

    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});


