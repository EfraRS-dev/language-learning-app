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
};

async function goToDashboard() {
    // Encuentra el radio button seleccionado
    const selectedLanguage = document.querySelector('input[name="radio"]:checked');
    window.location.href = '../dashboard/dashboard.html';

    // Verifica si hay un idioma seleccionado
    if (selectedLanguage) {
        console.log("Idioma seleccionado:", selectedLanguage.id2); // El ID del input seleccionado
        alert(`Idioma seleccionado: ${selectedLanguage.nextElementSibling.textContent.trim()}`);
    } else {
        alert("Por favor selecciona un idioma.");
    }

    // Redireccionar a otra página

    if (selectedLanguage && chooseIdiom(selectedLanguage.id2)) {
        window.location.href = '../dashboard/dashboard.html';
    }
};
