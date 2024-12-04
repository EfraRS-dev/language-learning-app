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

const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})

const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
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

var swiper = new Swiper(".slide-container", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
	centerSlide: "true",
    grabCursor: true,
	fade: "true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
