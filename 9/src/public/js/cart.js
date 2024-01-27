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

function emptyCart (id_cart) {
    let prods; {
        const endpoint = `http://localhost:4000/api/carts/${id_cart}`;

        fetch(endpoint, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                        alert("Carrito vaciado");
                        location.reload();
                } else {
                    console.error('Error al vaciar:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function substractToCart(id_cart,id_prod) {
    let prods; {
        const endpoint = `http://localhost:4000/api/carts/${id_cart}/products/${id_prod}`;

        fetch(endpoint, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                        alert("producto eliminado");
                        location.reload();
                } else {
                    console.error('Error al eliminar el elemento:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}