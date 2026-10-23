/* =========================================
   1. PRELOADER
========================================= */

const preloader = document.getElementById("preloader");

function hidePreloader() {
    if (preloader) {
        preloader.classList.add("loaded");
    }
}

window.addEventListener("load", hidePreloader);

// Évite de laisser l'écran de chargement affiché
// trop longtemps si certaines ressources sont lentes.

setTimeout(hidePreloader, 2500);


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Ouvrir le menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    document.body.classList.remove("menu-open");
}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        document.body.classList.toggle("menu-open", isOpen);

    });

    navLinks.forEach((link) => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {
            closeMenu();
        }

    });

}


/* =========================================
   3. ANIMATED TYPING TEXT
========================================= */

const typedText = document.getElementById("typed-text");

const words = [
    "génie civil",
    "BTP",
    "BIM & conception",
    "technologies du bâtiment"
];

let wordIndex = 0;
let characterIndex = 0;

let deleting = false;

let typingTimer;

const typingSpeed = 90;
const deletingSpeed = 45;
const pauseDuration = 1500;

function typeEffect() {

    if (!typedText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typedText.textContent = currentWord.substring(
            0,
            characterIndex + 1
        );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            typingTimer = setTimeout(
                typeEffect,
                pauseDuration
            );

            return;

        }

        typingTimer = setTimeout(
            typeEffect,
            typingSpeed
        );

    } else {

        typedText.textContent = currentWord.substring(
            0,
            characterIndex - 1
        );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

        typingTimer = setTimeout(
            typeEffect,
            deletingSpeed
        );

    }

}

if (
    typedText &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    typingTimer = setTimeout(typeEffect, 1000);

}


/* =========================================
   4. SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================
   5. HEADER ON SCROLL
========================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================================
   6. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navLinks.forEach((link) => {

                    const linkTarget = link.getAttribute("href");

                    const isActive = linkTarget === `#${currentId}`;

                    link.classList.toggle("active", isActive);

                });

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   7. AUTOMATIC FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   8. CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

/*
    Remplace cette adresse par ton véritable e-mail.
    Ce formulaire prépare un message dans l'application
    de messagerie de la personne qui consulte ton portfolio.

    Il ne transmet pas directement les données à un serveur.
*/

const contactEmail = "bilale.aboumon@gmail.com";

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            alert("Veuillez remplir tous les champs.");

            return;

        }

        if (contactEmail === "bilale.aboumon@gmail.com") {

            /*
                Vérifie bien que cette adresse est la tienne.
                Remplace-la avant de publier le site.
            */

        }

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            `Bonjour Bilale,\n\n` +
            `${message}\n\n` +
            `Nom : ${name}\n` +
            `E-mail : ${email}\n`
        );

        const mailtoLink =
            `mailto:${contactEmail}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;

        window.location.href = mailtoLink;

    });

}


/* =========================================
   9. CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu = navMenu.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        closeMenu();

    }

});


/* =========================================
   10. SAFETY: CANCEL TYPING IF PAGE HIDDEN
========================================= */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        clearTimeout(typingTimer);

    } else if (
        typedText &&
        !reducedMotion
    ) {

        clearTimeout(typingTimer);

        typingTimer = setTimeout(typeEffect, 300);

    }

});