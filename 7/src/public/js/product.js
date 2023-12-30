function addToCart(id_cart,id_prod) {
    let prods; {
        const endpoint = `http://localhost:4000/api/carts/${id_cart}/products/${id_prod}`;

        fetch(endpoint, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                        alert("producto agregado");
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