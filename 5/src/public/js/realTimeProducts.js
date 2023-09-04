const socket = io();
const form = document.getElementById('formAdd');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) 
    const prod = Object.fromEntries(datForm)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
    socket.on('prods', (prods) => {
        const product_list = document.getElementById('product_list')
        product_list.innerHTML =`<h3> Productos </h3> <hr>`
        prods.forEach(element => {
            product_list.innerHTML +=`<div class="card text-bg-success mb-3 margin-right" style="width: 10rem;"> <div class= "card-body"> <b>${element.title}</b> <p> stock ${element.stock} - price: ${element.price} </p> <button onclick="deleteProduct(${element.id});" class="btn btn-danger"> delete</button> </div> </div>`;
        });
    })
})

function deleteProduct(id){
    if(confirm(`Desea borrar el producto ${id} ?`)){
        socket.emit('eliminarProducto', id);
        socket.on('prods', (prods) => {
            const product_list = document.getElementById('product_list');
            product_list.innerHTML =`<h3> Productos </h3> <hr>`;
            prods.forEach(element => {
                product_list.innerHTML +=`<div class="card text-bg-success mb-3 margin-right" style="width: 10rem;"> <div class= "card-body"> <b>${element.title}</b> <p> stock ${element.stock} - price: ${element.price} </p> <button onclick="deleteProduct(${element.id});" class="btn btn-danger"> delete</button> </div> </div>`;
            });
        })
    }
}