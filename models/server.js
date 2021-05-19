const express = require('express');
const cors = require('cors');
const { socketConstroller } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);// importacion del paquete createServer dentro del contructor,y definiendo nuestra app dentro(server que tengo que levantar)
        this.io = require('socket.io')(this.server);// importacion del paquete socket.io dentro del contructor,y definiendo nuestro server dentro(io es toda la informacion de nuestro socket)

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets

        this.sockets();
    };


    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static('public'));

    };

    routes() {
        // this.app.use(this.paths.auth, require());
    }

    // Configuracion socket

    sockets() {

        this.io.on("connection", socketConstroller);
    }
    listen() {
        this.server.listen(this.port, () => {// Utilizando server para arrancar servidor ren vez de app
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;