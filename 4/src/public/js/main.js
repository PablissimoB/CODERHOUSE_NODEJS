function deleteProduct(id){
    let prods;
    if(confirm(`Desea borrar el producto ${id} ?`)){
        const endpointDelete = `http://localhost:4000/api/products/${id}`;

        fetch(endpointDelete, {
        method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                //esto lo hago porque todavia no se como renderizar products en handlebars con nuevo get
                setTimeout(() => {
                    location.reload();
                  }, 1200);
            } else {
            console.error('Error al borrar el elemento:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}