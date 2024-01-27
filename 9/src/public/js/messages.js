const socket = io()

const botonChat = document.getElementById('botonChat')
const parrafosMensajes = document.getElementById('parrafosMensajes')
const valInput = document.getElementById('message');
const user = document.getElementById('email');


botonChat.addEventListener('click', () => {
    let fechaActual = new Date().toLocaleString();
    const data = {
        "email": user.value,
        "message" : valInput.value,
        "postTime": fechaActual,
      };
        {
            const endpoint = `http://localhost:4000/api/messages`;
    
            fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)})
                .then(response => {
                    if (response.ok) {
                    } else {
                        console.error('Error al agregar el elemento:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        socket.emit('mensaje', { fecha: fechaActual, user: user, mensaje: valInput.value })
        valInput.value = "";
        e.target.reset();
        socket.on('mensajes', (arrayMensajes) => {
            parrafosMensajes.innerHTML = ""
            arrayMensajes.forEach(mensaje => {
            parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: el usuario ${mensaje.user} escribio ${mensaje.mensaje} </p>`
            })
        })
})