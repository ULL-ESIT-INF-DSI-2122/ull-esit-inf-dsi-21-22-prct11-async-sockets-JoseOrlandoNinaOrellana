import * as net from 'net';
import * as yargs from 'yargs';
import { Client } from './Client';
import { RequestType } from './RequestType';

// Petición al servidor
let request: RequestType = {
    type: 'none',
    user: '',
}

/**
 * Comando para añadir una nota
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note color',
            demandOption: true,
            type: 'string',
        }

    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string')
        {
            request = {
                type: 'add',
                user: argv.user,
                title: argv.title,
                body: argv.body,
                color: argv.color,
            }
        }
    },
});

/**
 * Comando para listar las notas de un usuario
 */
yargs.command({
    command: 'list',
    describe: 'list the notes of a person',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string') {
            request = {
                type: 'list',
                user: argv.user,
            }
        }
    },
});

/**
 * Comando para leer una nota
 */
yargs.command({
    command: 'read',
    describe: 'read the body of a note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string') {
            request = {
                type: 'read',
                user: argv.user,
                title: argv.title,
            }
        }
    },
});

/**
 * Comando para eliminar una nota
 */
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string') {
            request = {
                type: 'remove',
                user: argv.user,
                title: argv.title,
            }
        }
    },
});

/**
 * Comando para actualizar una nota
 */
yargs.command({
    command: 'update',
    describe: 'update a note',
    builder: {
        user: {
            describe: 'User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if(typeof argv.user=== 'string' && typeof argv.title === 'string' && typeof argv.body === 'string') {
            request = {
                type: 'update',
                user: argv.user,
                title: argv.title,
                body: argv.body
            }
        }
    },
});

yargs.parse();

if(request.type !== 'none') {
    // Creamos un objeto de la clase cliente pasandole el puerto
    const client = new Client(net.connect({port: 60300}));

    // Realizamos la petición
    client.makeRequest(request);

    // Esperamos la respuesta
    client.receiveRespond();
}