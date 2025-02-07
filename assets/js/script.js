function headerSidebar() {
    const headerNav = document.querySelector('.head-nav');
    const headerLinkz = headerNav.querySelectorAll('a');
    const headToggle = document.querySelector('.head-toggle');
    const headClose = document.querySelector('.nv-close');

    headToggle.addEventListener('click', () => {
        headerNav.classList.toggle('active');
    });
    headClose.addEventListener('click', () => {
        headerNav.classList.remove('active');
    });

    document.addEventListener('click', (event) => {
        if (!headerNav.contains(event.target) && !headToggle.contains(event.target)) {
            headerNav.classList.remove('active');
        }
    });
    headerLinkz.forEach(link => {
        link.addEventListener('click', () => {
            headerNav.classList.remove('active');
        });
    });
}
headerSidebar();

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 8000) {
        var swiper = new Swiper(".svSwiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 30,
            loop: true,
            initialSlide: 1,
            speed: 800, // Transition speed
            autoplay: {
                delay: 3000,       // No delay between slides
                disableOnInteraction: false,
            },
            pagination: {
                el: ".sv-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".sv-button-next",
                prevEl: ".sv-button-prev",
            }
        });

        // Make sure to add Swiper classes only on mobile
        document.querySelector(".swiper-wrapper").classList.add("swiper-wrapper-active");
        document.querySelectorAll(".swiper-slide").forEach(slide => slide.classList.add("swiper-slide-active"));
    }
});

var swiper = new Swiper(".revSwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    speed: 800, // Transition speed
    autoplay: {
        delay: 5000,       // No delay between slides
        disableOnInteraction: false,
    },
    pagination: {
        el: ".rev-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".rev-button-next",
        prevEl: ".rev-button-prev",
    }
});

var swiper = new Swiper(".svcbSwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".svcb-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".svcb-button-next",
        prevEl: ".svcb-button-prev",
    },
});









function lerp() {
    const elements = document.querySelectorAll('.lerp-element');

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;

        elements.forEach(element => {
            const strength = parseFloat(element.getAttribute('data-power')) || 0.02;
            const rect = element.getBoundingClientRect();
            const offsetX = (clientX - (rect.left + rect.width / 2)) * strength;
            const offsetY = (clientY - (rect.top + rect.height / 2)) * strength;

            gsap.to(element, {
                x: offsetX,
                y: offsetY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

lerp();




gsap.from(".serv-right ul li", {
    scrollTrigger: {
        trigger: ".serv-right ul li",
        start: 'top 80%',
        end: 'bottom 20%',
    },
    scale: 0.9,
    opacity: 0.5,
    y: 20,
    stagger: 0.2,
    duration: 0.5,
    ease: 'power2.out'
});









document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    if (cookieBanner) {
        const closeBtn = document.getElementById("close-cookie");
        const acceptBtn = document.getElementById("accept-all");
        const rejectBtn = document.getElementById("reject-all");

        // Check if user has already made a choice
        if (localStorage.getItem("cookieConsent")) {
            cookieBanner.classList.add("hidden");
        }

        // Accept all cookies
        acceptBtn.addEventListener("click", function () {
            localStorage.setItem("cookieConsent", "accepted");
            cookieBanner.classList.add("hidden");
        });

        // Reject unnecessary cookies
        rejectBtn.addEventListener("click", function () {
            localStorage.setItem("cookieConsent", "rejected");
            cookieBanner.classList.add("hidden");
        });

        // Close banner manually
        closeBtn.addEventListener("click", function () {
            cookieBanner.classList.add("hidden");
        });
    }
});





document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset any previous error states
    resetErrorStates();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        privacy: document.getElementById('privacy').checked
    };

    // Send the form data
    fetch('https://eccentrico.frototype.agency/rest/contact-form.php', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === "200") {
                showSuccessMessage();
                document.getElementById('contactForm').reset();
            } else {
                showErrorMessage();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        });
});

function validateForm() {
    let isValid = true;

    // Required fields validation
    const requiredFields = ['fullName', 'phone', 'email', 'message', 'privacy'];
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (field === 'privacy') {
            if (!element.checked) {
                showError(element, 'Devi accettare la privacy policy');
                isValid = false;
            }
        } else if (!element.value.trim()) {
            showError(element, 'Campo obbligatorio');
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email.value.trim() && !isValidEmail(email.value)) {
        showError(email, 'Inserisci un indirizzo email valido');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    if (phone.value.trim() && !isValidPhone(phone.value)) {
        showError(phone, 'Inserisci un numero di telefono valido');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

function showError(element, message) {
    // Add error class to the parent field-column
    const fieldColumn = element.closest('.field-column');
    if (fieldColumn) {
        fieldColumn.classList.add('error');

        // Create or update error message
        let errorDiv = fieldColumn.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            fieldColumn.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
}

function resetErrorStates() {
    // Remove all error states and messages
    document.querySelectorAll('.field-column.error').forEach(column => {
        column.classList.remove('error');
        const errorMessage = column.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage() {
    // Create and show success message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = 'Messaggio inviato con successo!';
    insertMessage(messageDiv);
}

function showErrorMessage() {
    // Create and show error message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message error';
    messageDiv.textContent = 'Si è verificato un errore. Riprova più tardi.';
    insertMessage(messageDiv);
}

function insertMessage(messageDiv) {
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}