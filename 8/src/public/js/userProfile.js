function endSession() {
    {
        const endpoint = `http://localhost:4000/api/sessions/current`;

        fetch(endpoint, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                        
                    window.location.href = '/static/UserLogin'
                } else {
                    console.error('Error al terminar sesion:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}