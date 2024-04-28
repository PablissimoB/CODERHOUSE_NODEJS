function deletear(id){
    if(confirm("Esta seguro de querer borrar el usuario?"))
    {
            const endpoint = `http://localhost:4000/api/users/${id}`;

            fetch(endpoint, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                            alert("Usuario eliminado");
                            window.location.href = '/static/UserProfiles'
                    } else {
                        console.error('Error al eliminar usuario:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    }
}

function modify(id, rol){
    if(confirm("Esta seguro de querer cambiar al usuario " + id +" con rol de "+rol)){
        const endpoint = `http://localhost:4000/api/users/${id}`;

            fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
                },
                body: JSON.stringify({role: rol})
            })
                .then(response => {
                    if (response.ok) {
                            alert("Usuario modificado");
                            window.location.href = '/static/UserProfiles'
                    } else {
                        console.error('Error al modificar usuario:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    }
}