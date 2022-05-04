import { EventEmitter } from 'events';

/**
 * Clase MessageEventEmitter
 */
export class MessageEventEmitter extends EventEmitter {
    /**
     * Emite un evento message cuando recibe por completo una petición o respuesta
     * @param connection 
     */
    constructor(connection: EventEmitter) {
        super();

        let wholeData = '';
        connection.on('data', (dataChunk) => {
            wholeData += dataChunk;

            let messageLimit = wholeData.indexOf('\n');
            while(messageLimit !== -1) {
                const message = wholeData.substring(0, messageLimit);
                wholeData = wholeData.substring(messageLimit + 1);
                this.emit('message', JSON.parse(message));
                messageLimit = wholeData.indexOf('\n');
            }
        });
    }
}