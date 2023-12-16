function deleteProduct(id_prod) {
    if(confirm("Are you sure to delete this product?")){        
        console.log(id_prod);
        let prods; {
            const endpoint = `http://localhost:4000/api/products/${id_prod}`;
            fetch(endpoint, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    } else {
                        console.error('Error al agregar el elemento:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
}