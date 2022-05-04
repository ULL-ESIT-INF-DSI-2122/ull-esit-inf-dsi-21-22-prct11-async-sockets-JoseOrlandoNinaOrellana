import * as net from 'net';
import { Note } from './Note';
import { NoteManager } from './NoteManager';
import { ResponseType } from './ResponseType';
import { MessageEventEmitter } from './MessageEventEmitter';

net.createServer((connection) => {
    const getRequest = new MessageEventEmitter(connection);
    getRequest.on('message', (request) => {
        let manager: NoteManager = new NoteManager();
        let note: Note;
        let output: string = '';
        console.log('Request from ' + request.user + ':');
        console.log(request);

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

        let response: ResponseType = {
            response: output,
        }
        connection.write(JSON.stringify(response) + '\n');
        connection.end();
    });
}).listen(60300, () => {
    console.log('Waiting');
});