import 'mocha';
import { expect } from 'chai';
import { EventEmitter } from 'events';
import { MessageEventEmitter } from '../src/MessageEventEmitter';

describe('MessageEventEmitterClient', () => {
    it('Should emit a message event once it gets a complete message', (done) => {
        const socket = new EventEmitter();
        const client = new MessageEventEmitter(socket);

        client.on('message', (message) => {
            expect(message).to.be.eql({type: 'list', user: 'orlando'});
            done();
        });

        socket.emit('data', '{"type": "list",');
        socket.emit('data', '"user": "orlando"}');
        socket.emit('data', '\n');
    });
});
