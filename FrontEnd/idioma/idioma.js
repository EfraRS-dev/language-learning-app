async function chooseIdiom(idiomID) {
    // const username = document.getElementById('newusername').value;
    // const email = document.getElementById('newemail').value;
    // const password = document.getElementById('newpassword').value;
    const idiomID = idiomID;
    const url = 'http://127.0.0.1:8000/idiom';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idiomID }),
        });

        const data = await response.json();

        if (response.ok) {
        } else {
            alert(data.detail || 'Error al registrarse. Por favor, verifica los datos.');
        }
    } catch (error) {
        console.error('Error during language choosing:', error);
        alert('Ocurrió un error durante la selección de idioma.');
    }

    return true;
}