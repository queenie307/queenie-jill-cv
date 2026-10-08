// =========================================
// script.js - interactions for the CV page
// =========================================

// 1. MOBILE MENU -------------------------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Open or close the menu when the hamburger is clicked
navToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is clicked (on mobile)
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// 2. SHOW ELEMENTS WHEN SCROLLED INTO VIEW -------------------------
const revealItems = document.querySelectorAll(".reveal");

// IntersectionObserver tells us when an element enters the screen
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});

// 3. HIGHLIGHT THE CURRENT SECTION IN THE NAV -------------------------
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" } // checks the middle of the screen
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

// 4. AUTO-UPDATE THE YEAR IN THE FOOTER -------------------------
document.getElementById("year").textContent = new Date().getFullYear();
