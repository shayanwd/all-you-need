function headerSidebar(params) {
    const headerNav = document.querySelector('.head-nav');
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
}
headerSidebar();






window.addEventListener('resize', () => {
    location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 1024) {
        var swiper = new Swiper(".svSwiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 30,
            loop: true,
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
        delay: 3000,       // No delay between slides
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


