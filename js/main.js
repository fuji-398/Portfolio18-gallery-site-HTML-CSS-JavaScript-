"use strict";

/* common */
const hamburgerBtn = document.querySelector(".toggle-btn");

function getScrollTop() {
    return window.scrollY || document.documentElement.scrollTop;
}

/* fade-in */
const topLogo = document.querySelector(".top_logo");

const fadeInOnScroll = (element, threshold) => {
    const scrollTop = getScrollTop();
    element.classList.toggle("fade-in", scrollTop >= threshold);
};

addEventListener("scroll", () => {
    requestAnimationFrame(() => {
        fadeInOnScroll(topLogo, 520);
        fadeInOnScroll(hamburgerBtn, 520);
    });
});

/* hamburgerBtn */
const navList = document.querySelector(".nav-list");
const jsNav = document.querySelectorAll(".js__nav");

const toggleNav = () => {
    hamburgerBtn.classList.toggle("open");
    navList.classList.toggle("open");
};

hamburgerBtn.onclick = toggleNav;

jsNav.forEach((item) => {
    item.onclick = toggleNav;
});

/* mainvisual */
const breakpoint = 900;
const mainvisualWpr = document.querySelector(".mainvisual-wpr");
const mainvisualImg = document.querySelectorAll(".mainvisual-img");
const scaleMax = 630;

function calculateScaleFactor(scrollTop, scaleMax, factor) {
    return scrollTop < scaleMax ? 1 + scrollTop / factor : 1 + scaleMax / factor;
}

function applyStyles(scrollTop, windowWidth) {
    const scaleFactor = windowWidth <= breakpoint ? 1 - scrollTop / 500 : calculateScaleFactor(scrollTop, scaleMax, 1000);

    mainvisualWpr.style.width = `${300 - scaleFactor * 10}%`;

    mainvisualImg.forEach((img) => {
        img.style.width = windowWidth <= breakpoint ? `${100 - scrollTop / 9}vw` : `${100 / 3 + (scrollTop < scaleMax ? scrollTop : scaleMax) / 10}%`;
    });
}

window.addEventListener("scroll", () => {
    const scrollTop = getScrollTop();
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    applyStyles(scrollTop, windowWidth);
});

// const breakpoint = 900;
// const mainvisualWpr = document.querySelector(".mainvisual-wpr");
// const mainvisualImg = document.querySelectorAll(".mainvisual-img");
// const scaleMax = 630;

// window.addEventListener("scroll", () => {
//     const scrollTop = getScrollTop();
//     const windowWidth = window.innerWidth || document.documentElement.clientWidth;
//     let scaleFactor;

//     if (windowWidth <= breakpoint) {
//         scaleFactor = 1 - scrollTop / 500;
//     } else {
//         if (scrollTop < scaleMax) {
//             scaleFactor = 1 + scrollTop / 1000;
//         } else {
//             scaleFactor = 1 + scaleMax / 1000;
//         }
//     }

//     mainvisualWpr.style.width = `${300 - scaleFactor * 10}%`;

//     mainvisualImg.forEach((img) => {
//         if (windowWidth <= breakpoint) {
//             img.style.width = 100 - scrollTop / 9 + "vw";
//         } else {
//             if (scrollTop < scaleMax) {
//                 img.style.width = 100 / 3 + scrollTop / 23 + "%";
//             } else {
//                 img.style.width = 100 / 3 + scaleMax / 23 + "%";
//             }
//         }
//     });
// });

/* inview */
const inviewElements = document.querySelectorAll(".js__inview");

const handleInView = (entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("visible")) {
        entry.target.classList.add("visible");
        inviewObserver.unobserve(entry.target);
    }
};

const inviewObserver = new IntersectionObserver((entries) => {
    entries.forEach(handleInView);
});

inviewElements.forEach((element) => {
    inviewObserver.observe(element);
});

/* aside and bg-img fade in-out */
const updateClass = (elementA, elementB, targetX) => {
    const rectA = elementA.getBoundingClientRect();
    const rectB = elementB.getBoundingClientRect();

    if ((window.innerHeight || document.documentElement.clientHeight) >= rectA.top && (window.innerHeight || document.documentElement.clientHeight) < rectB.top) {
        targetX.classList.add("fade-in");
    } else {
        targetX.classList.remove("fade-in");
    }
};

const gallery = document.getElementById("gallery");
const access = document.getElementById("access");
const aside = document.querySelector(".aside");
const contact = document.getElementById("contact");
const bgImg = document.querySelector(".bg-img");

window.addEventListener("scroll", () => {
    updateClass(gallery, access, aside);
    updateClass(access, contact, bgImg);
});
window.addEventListener("resize", () => {
    updateClass(gallery, access, aside);
    updateClass(access, contact, bgImg);
});

updateClass(gallery, access, aside);
updateClass(access, contact, bgImg);
