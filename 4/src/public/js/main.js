async function reloadProducts(){
    try{
        const productsResponse = await fetch('http://localhost:4000/api/products/');
        const products = await productsResponse.json();

        product_list.innerHTML =`<h1> Lista de Productos </h1> <hr>`
        products.forEach(element => {
            product_list.innerHTML +=`
            <div class="card text-bg-success mb-3" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <p class="card-text">precio : ${element.price} - stock: ${element.stock}</p>
                <button onclick="deleteProduct('${element.id}');" " class="btn btn-danger"> delete</button>
                </div>
            </div>
            `;
        });
    }
    catch(error){
        console.error('Error al cargar los productos:', error);
    }

}

async function deleteProduct(id){
    let prods;
    if(confirm(`Desea borrar el producto ${id} ?`)){
        const endpointDelete = `http://localhost:4000/api/products/${id}`;

        const response = await fetch(endpointDelete, {
            method: 'DELETE'
          });
            if (response.ok) {
                await reloadProducts();
            } else {
            console.error('Error al borrar el elemento:', response.statusText);
            }
    }
}