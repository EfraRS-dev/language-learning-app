const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

function login() {
    const username = document.getElementById("username-field")
    const password = document.getElementById("password-field")
    const formData = FormData()
    formData.append("username", username)
    formData.Append("password", password)
    fetch("http://0.0.0.0:8000/token")
};

async function loginForAccessToken() {
    const username = document.getElementById('username-field').value;
    const password = document.getElementById('password-field').value;
    const url = 'http://127.0.0.1:8000/token';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = '../dashboard/dashboard.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login');
    }
}

async function registerUser() {
    const username = document.getElementById('newusername').value;
    const email = document.getElementById('newemail').value;
    const password = document.getElementById('newpassword').value;
    const url = 'http://127.0.0.1:8000/register';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso, ahora puedes iniciar sesión.');
            window.location.href = '../idioma/idioma.html';
        } else {
            alert(data.detail || 'Error al registrarse. Por favor, verifica los datos.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Ocurrió un error durante el registro.');
    }
}


