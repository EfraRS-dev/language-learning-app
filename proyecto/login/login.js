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

async function loginForAccessToken(username, password) {
    const url = 'http://0.0.0.0:8000/token'; // Asegúrate de usar la URL completa si es necesario
    const data = new URLSearchParams({
        username: username,
        password: password
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.detail}`);
        }

        const tokenData = await response.json();
        console.log('Access Token:', tokenData.access_token);
        return tokenData;
    } catch (error) {
        console.error('Error logging in:', error.message);
        return null;
    }
}

