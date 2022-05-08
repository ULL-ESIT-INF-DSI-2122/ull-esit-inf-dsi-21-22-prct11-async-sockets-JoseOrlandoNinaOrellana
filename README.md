# Informe Práctica 11

## Tipo RequestType

Crearemos un tipo `RequestType` para la realizar la petición al servidor. Contendrá el tipo de petición, el usurio que realiza la petición y atributos opcionales como el título, cuerpo y color de la nota.

## Tipo ResponseType

Crearemos un tipo `ResponseType` para realizar la respuesta del servidor. Contendra un string `response` que será la respuesta del servidor al comando ejecutado.

## Clase MessageEventEmitter

La clase hija `MessageEventEmitter` de `EventEmitter` permite emiter eventos. Esta clase emite un evento de tipo `message` cada vez que recibe un mensaje completo. 

El contructor recibe un objeto `EventEmitter`, `connection`. Después registramos un manejador que se ejecuta con cada emisión del evento `data`. El mensaje se considera completo cuando se envía un '\n', si no se ha recibido ese caracter todavía se almacena el `dataChunk` en `wholeData`. Una vez recibido el caracter '\n', le quitamos ese caracter a `wholeData` y emitimos un evento `mesage` y pasamos el objeto.

## Clase Client

La clase `Client` se encargará de realizar peticiones al servidor y recibir la respuesta a esa petición. 

El contructor recibe como parámetro el socket de la conexión y se guarda como un atributo privado de la clase. 

La función `makeRequest` realiza la petición al servidor recibiendo como parámetro un tipo `RequestType`. Para ello escribe en el socket el objeto en formato JSON y además enviaremos el caracter '\n' indicando que el mensaje se ha enviado completo. 

La función `receiveRespond` se encarga de recibir la respuesta del servidor y mostrarla por pantalla. Crearemos un objeto llamado `getResponse` de tipo `MessageEventEmitter` pasandole el socket como parámetro del constructor. Después registramos un manejador que se ejecuta con cada emisión del evento `message` y se encargará por pantalla la respuesta del servidor.

## Servidor

Crearemos un servidor con `createServer` que escuchará el puerto 60300. Crearemos `getRequest` que será un objeto `MessageEventEmitter`. Resgistramos un manejador que se ejecuta con cada emisión del evento `message`. Este manejador creará `manager`, un objeto de tipo `NoteManager`, que se encargará de ejecutar la petición del cliente. Por último escribiremos la respuesta en el socket y ademas el caracter '\n' indicando final del mensaje.

## App

Registramos el comando con `command` de `yargs`. Cada vez que se registre un comando crearemos un objeto tipo `RequestType` que será la petición al servidor. Si el comando es distinto de 'none' crearemos un cliente de tipo `Client` y enviaremos la petición `makeRequest` pasandole el objeto `request` y por último esperaremos la respuesta con `receiveRespond`.

## Ejemplo de uso

Petición tipo `list`:

![](https://gyazo.com/64e8334bb56afccea9cdb9c50ee0b1ba.png)

![](https://gyazo.com/235f4a1c174b50ab86af909610e720c2.png)

Petición de un usuario que no existe:

![](https://gyazo.com/786249c200bf2d5a9338e41e2f1173e6.png)

![](https://gyazo.com/16352aa18891ee361ab4732a305a47df.png)
