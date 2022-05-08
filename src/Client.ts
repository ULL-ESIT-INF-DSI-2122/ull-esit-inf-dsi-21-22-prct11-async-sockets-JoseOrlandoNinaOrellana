import * as net from 'net';
import { RequestType } from './RequestType';
import { MessageEventEmitter } from './MessageEventEmitter';

/**
 * Clase cliente
 */
export class Client {
    /**
     * Constructor
     * @param socket 
     */
    constructor(private socket: net.Socket) {}

    /**
     * Escribe en el socket una petición al servidor
     * @param request Petición
     */
    makeRequest(request: RequestType) {
        this.socket.write(JSON.stringify(request) + '\n', (err) =>{
            if(err)
                console.error(err.message);
        });
    }

    /**
     * Muestra por pantalla la respuesta del servidor
     */
    receiveRespond() {
        const getResponse = new MessageEventEmitter(this.socket);

        getResponse.on('message', (response) => {
            console.log('Response from server: ')
            console.log(response.response)
        });
    }
}