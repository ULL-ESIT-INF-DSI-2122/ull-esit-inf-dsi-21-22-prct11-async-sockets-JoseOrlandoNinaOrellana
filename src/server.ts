import * as net from 'net';
import { Note } from './Note';
import { NoteManager } from './NoteManager';
import { ResponseType } from './ResponseType';
import { MessageEventEmitter } from './MessageEventEmitter';

// Creamos el server
net.createServer((connection) => {
    // Creamos un objeto MessageEventEmitter
    const getRequest = new MessageEventEmitter(connection);

    // Registramos un manejador para el evento message
    getRequest.on('message', (request) => {
        // Creamos objetos y mostramos por pantalla la petición
        let manager: NoteManager = new NoteManager();
        let note: Note;
        let output: string = '';
        console.log('Request from ' + request.user + ':');
        console.log(request);

        // Comprobamos el tipo de petición y la ejecutamos
        if(request.type === 'add') {
            note = new Note(request.title as string, request.body as string, request.color as string);
            output += manager.writeNote(request.user, note);
        }
        else if(request.type === 'update') {
            output += manager.updateNote(request.user, request.title as string, request.body as string);
        }
        else if(request.type === 'remove') {
            output += manager.removeNote(request.user, request.title as string);
        }
        else if(request.type === 'read') {
            output += manager.readNote(request.user, request.title as string);
        }
        else if(request.type === 'list') {
            output += manager.listNotes(request.user as string);
        }
        else {
            output = 'The command does not exists';
        }

        // Creamos un objeto respuesta
        let response: ResponseType = {
            response: output,
        }

        // Escribimos la respuesta
        connection.write(JSON.stringify(response) + '\n', (err) => {
            if(err)
                console.error(err.message);
        });

        // Cerramos la conexión
        connection.end();
    });
}).listen(60300, () => {
    console.log('Waiting');
});