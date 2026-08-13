/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileOverlay = document.getElementById("mobileOverlay");


function openMobileMenu() {

    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeMobileMenu() {

    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


menuBtn.addEventListener("click", openMobileMenu);

mobileClose.addEventListener("click", closeMobileMenu);

mobileOverlay.addEventListener("click", closeMobileMenu);


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", closeMobileMenu);

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.querySelector("#themeIcon use");

const savedTheme = localStorage.getItem("selma-theme");


function updateThemeIcon() {

    const isDark =
        document.body.classList.contains("dark");

    themeIcon.setAttribute(
        "href",
        isDark ? "#icon-sun" : "#icon-moon"
    );
}


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeIcon();


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "selma-theme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

});


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projects =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projects.forEach(project => {

            const category =
                project.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                project.classList.remove("hidden");

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =====================================================
   EMPTY LINKS
   لینک‌هایی که هنوز خودت وارد نکردی
   صفحه را خراب نمی‌کنند.
===================================================== */

document
    .querySelectorAll("[data-empty-link]")
    .forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");


            if (
                !href ||
                href === "#"
            ) {

                event.preventDefault();

            }

        });

    });


/* =====================================================
   EXTERNAL LINKS
   لینک‌های واقعی در تب جدید باز می‌شوند
===================================================== */

document
    .querySelectorAll(
        '.project-links a:not([data-empty-link]), .gallery-item:not([data-empty-link]), .preview-btn:not([data-empty-link]), .social-link:not([data-empty-link])'
    )
    .forEach(link => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });