const { Socket } = require("socket.io");




const socketConstroller = (socket) => {

    // Conectando socket,y escuchando cuando se conecta el usuario



    console.log('cliente conectado', socket.id)// Parametro id del socket,es volatil pero util para asignar un id al usuario que se conecta

    socket.on('disconnect', () => {// escuchando cambios en el usuario ,en este caso si se desconecta el usuario
        console.log('Cliente desconectado', socket.id);
    });

    // codigo para escuchar mensaje del cliente
    socket.on('enviar-mensaje', (payload, callback) => {// Codigo para retornar el id utilizando un segundo argumento,solo el cliente que emitio el mensaje recibira esta informacion

        const id = 123456;
        callback({ id, fecha: new Date().getTime() });

        socket.broadcast.emit('enviar-mensaje', payload);// Este emit es cuando el servidor envia un mensaje
        // this.io.emit('enviar-mensaje', payload);// Este this.io.emit es cuando el servidor envia un mensaje(Este solo se puede utilizar en el server,aqui no hay acceso a este)
    });

};




module.exports = {

    socketConstroller
}