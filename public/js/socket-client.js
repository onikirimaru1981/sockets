// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();

socket.on('connect', () => {// Listener para saber cuando se conectan al server

    // console.log('Conectado al servidor');

    lblOffline.style.display = 'none'// Codigo para mostrar estado online en html
    lblOnline.style.display = ''
});

socket.on('disconnect', () => {

    // console.log('Desconectado del servidor');
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);

});

// Codigo para emitir mensaje al servidor
btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    };
    socket.emit('enviar-mensaje', payload, (id) => {// Codigo mandando un tercer argumento,el id 

        console.log('Desde el server', id);
    });
});