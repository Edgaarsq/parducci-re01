/* =========================================
   PARDUCCI — INTERACTION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const header = document.querySelector(".site-header");
    const heroImage = document.querySelector(".hero-image");
    const heroContent = document.querySelector(".hero-content");

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".statement, " +
        ".service-card, " +
        ".work-item, " +
        ".principle, " +
        ".process-step, " +
        ".final-cta"
    );

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");

    const buttons = document.querySelectorAll(
        ".button, .nav-cta, .cta-button"
    );


    /* =========================================
       REDUCED MOTION
    ========================================= */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* =========================================
       PAGE LOAD
    ========================================= */

    document.body.classList.add("page-loaded");


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    if (!prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            /*
                Small delay between elements
                creates a controlled stagger.
            */

            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 0.04, 0.3)}s`
            );

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    let previousScroll = window.scrollY;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll = window.scrollY;

            if (!header) {
                return;
            }


            if (currentScroll > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }


            if (
                currentScroll > previousScroll &&
                currentScroll > 200
            ) {

                header.classList.add("header-hidden");

            } else {

                header.classList.remove("header-hidden");

            }


            previousScroll = currentScroll;

        },
        {
            passive: true
        }
    );


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    if (sections.length > 0) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        const target =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            target === `#${currentId}`
                        );

                    });

                });

            },
            {
                rootMargin: "-40% 0px -50% 0px"
            }
        );


        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =========================================
       SMOOTH ANCHOR NAVIGATION
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       HERO PARALLAX
    ========================================= */

    if (
        heroImage &&
        heroContent &&
        !prefersReducedMotion
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 2;

                mouseY =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 2;

            }
        );


        const animateHero = () => {

            currentX +=
                (mouseX - currentX) * 0.04;

            currentY +=
                (mouseY - currentY) * 0.04;


            heroImage.style.transform =
                `translate3d(
                    ${currentX * 8}px,
                    ${currentY * 8}px,
                    0
                )`;


            heroContent.style.transform =
                `translate3d(
                    ${currentX * -3}px,
                    ${currentY * -3}px,
                    0
                )`;


            requestAnimationFrame(
                animateHero
            );

        };


        animateHero();

    }


    /* =========================================
       MAGNETIC BUTTONS
    ========================================= */

    if (!prefersReducedMotion) {

        buttons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =========================================
       WORK IMAGE TILT
    ========================================= */

    if (!prefersReducedMotion) {

        document.querySelectorAll(
            ".work-image"
        ).forEach(image => {

            image.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        image.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y / rect.height) -
                            0.5) * -4;

                    const rotateY =
                        ((x / rect.width) -
                            0.5) * 4;


                    image.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            image.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "";

                }
            );

        });

    }


    /* =========================================
       SERVICE CARD POINTER EFFECT
    ========================================= */

    if (!prefersReducedMotion) {

        document.querySelectorAll(
            ".service-card, .principle"
        ).forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }


    /* =========================================
       KEYBOARD ACCESSIBILITY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document.activeElement?.blur();

            }

        }
    );


    /* =========================================
       RESIZE RESET
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth < 1000 &&
                heroImage
            ) {

                heroImage.style.transform =
                    "";

            }

        },
        {
            passive: true
        }
    );

});