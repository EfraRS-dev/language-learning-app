document.addEventListener('DOMContentLoaded', function () {
    // Manejo de los enlaces del menú principal
    const mainLinks = document.querySelectorAll('#sidebar .side-menu > li > a');
    const subLinks = document.querySelectorAll('#sidebar .side-dropdown a');

    function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.side-dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }

    mainLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const dropdown = this.nextElementSibling;
            if (dropdown && dropdown.classList.contains('side-dropdown')) {
                const isAlreadyOpen = dropdown.classList.contains('show');
                closeAllDropdowns();
                if (!isAlreadyOpen) {
                    dropdown.classList.toggle('show');
                }
            } else {
                closeAllDropdowns();
            }

            mainLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    subLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            subLinks.forEach(item => item.classList.remove('sub-active'));
            this.classList.add('sub-active');
            mainLinks.forEach(item => item.classList.remove('active'));
            const parentLink = this.closest('.side-menu > li').querySelector('a');
            if (parentLink) parentLink.classList.add('active');
        });
    });

    // Manejo del perfil y la imagen del perfil
    const profile = document.querySelector('nav .profile');
    if (profile) {
        const imgProfile = profile.querySelector('img');
        const dropdownProfile = profile.querySelector('.profile-link');

        if (imgProfile && dropdownProfile) {
            imgProfile.addEventListener('click', function () {
                dropdownProfile.classList.toggle('show');
            });
        }
    }

    // Manejo de la visibilidad del sidebar en pantallas pequeñas
    const toggleSidebar = document.querySelector('nav .toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const allSideDivider = document.querySelectorAll('#sidebar .divider');
    const allDropdown = document.querySelectorAll('.side-dropdown');

    if (sidebar && sidebar.classList.contains('hide')) {
        allSideDivider.forEach(item => {
            item.textContent = '-';
        });
        allDropdown.forEach(item => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
        });
    } else {
        allSideDivider.forEach(item => {
            item.textContent = item.dataset.text;
        });
    }

    toggleSidebar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');

        if (sidebar.classList.contains('hide')) {
            allSideDivider.forEach(item => {
                item.textContent = '-';
            });
            allDropdown.forEach(item => {
                const a = item.parentElement.querySelector('a:first-child');
                a.classList.remove('active');
                item.classList.remove('show');
            });
        } else {
            allSideDivider.forEach(item => {
                item.textContent = item.dataset.text;
            });
        }
    });

    sidebar.addEventListener('mouseleave', function () {
        if (this.classList.contains('hide')) {
            allDropdown.forEach(item => {
                const a = item.parentElement.querySelector('a:first-child');
                a.classList.remove('active');
                item.classList.remove('show');
            });
            allSideDivider.forEach(item => {
                item.textContent = '-';
            });
        }
    });

    sidebar.addEventListener('mouseenter', function () {
        if (this.classList.contains('hide')) {
            allDropdown.forEach(item => {
                const a = item.parentElement.querySelector('a:first-child');
                a.classList.remove('active');
                item.classList.remove('show');
            });
            allSideDivider.forEach(item => {
                item.textContent = item.dataset.text;
            });
        }
    });

    // Toggle sidebar visibility based on screen size
    document.addEventListener('DOMContentLoaded', () => {
        const toggleSidebar = () => {
            if (window.innerWidth < 800) {
                sidebar.classList.add('hide');
            } else {
                sidebar.classList.remove('hide');
            }
        };

        toggleSidebar();

        window.addEventListener('resize', toggleSidebar);
    });

    // Manejo de las pestañas
    let navtabs = document.querySelectorAll('.sliderTab');
    navtabs.forEach(item => {
        item.addEventListener('click', function (event) {
            if (event.target.classList.contains('nav-item')) {
                let lastActive = item.querySelector('li.active');
                let newActive = event.target;
                let bgActive = item.querySelector('.bg-active');

                lastActive.classList.remove('active');
                newActive.classList.add('active');
                bgActive.style.left = newActive.offsetLeft + 'px';

                let lastContentActive = item.querySelector('.tab.active');
                let newContentActive = document.getElementById(newActive.dataset.target);
                lastContentActive.classList.remove('active');
                newContentActive.classList.add('active');
            }
        });
    });
});

// async function fetchQuiz(lessonID) {
//     const url = `http://localhost:8000/questions/${lessonID}`; // Asegúrate de que el servidor esté corriendo
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         const questions = await response.json();
//         console.log('Preguntas obtenidas:', questions);
//         return questions;
//     } catch (error) {
//         console.error('Error al obtener las preguntas:', error);
//         return [];
//     }
// }

// // Llamada al endpoint para obtener preguntas
// const lessonID = 1101; // Cambia según sea necesario
// fetchQuiz(lessonID).then(questions => {
//     const quiz = questions;
//     console.log('Quiz listo:', quiz);
// });

/*const quiz = [
	{
		q: 'I ___ a student',
		options: ['is', 'am', 'are', 'was'],
		answer: 1
	},
	{
		q: 'She ___ my sister',
		options: ['is', 'are', 'am', 'were'],
		answer: 0
	},
	{
		q: 'They ___ friends',
		options: ['is', 'am', 'are', 'was'],
		answer: 2
	},
	{
		q: 'We ___ in the same class',
		options: ['is', 'am', 'are', 'was'],
		answer: 2
	},
	{
		q: 'You ___ very smart',
		options: ['is', 'am', 'are', 'was'],
		answer: 2
	},
];*/

