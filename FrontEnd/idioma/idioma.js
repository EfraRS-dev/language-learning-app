// Función para seleccionar el idioma
async function chooseIdiom(idiomID) {
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

        if (!response.ok) {
            alert(data.detail || 'Error al seleccionar idioma. Por favor, verifica los datos.');
            return false;
        }
    } catch (error) {
        console.error('Error durante la selección de idioma:', error);
        alert('Ocurrió un error durante la selección de idioma.');
        return false;
    }

    return true;
}

// Evento del botón
document.querySelector('.send-btn').addEventListener('click', async function () {
    const selectedLanguage = document.querySelector('input[name="radio"]:checked');

    if (selectedLanguage) {
        const idiomID = selectedLanguage.getAttribute('id2');
        console.log("Idioma seleccionado:", idiomID);

        //const success = await chooseIdiom(idiomID);
        success = true;

        if (success) {
            alert(`Idioma seleccionado: ${selectedLanguage.nextElementSibling.textContent.trim()}`);
            // Redirige a la nueva página
            window.location.href = '../dashboard/dashboard.html';
        }
    } else {
        alert("Por favor selecciona un idioma.");
    }
});
