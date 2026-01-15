/* =====================================================
   M-Consultancy | Professional JavaScript
   Author: M-Consultancy
   Purpose: UX, Accessibility, Interaction Layer
===================================================== */

"use strict";

/* -----------------------------------------------------
   DOM UTILITIES
----------------------------------------------------- */
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

/* -----------------------------------------------------
   DOCUMENT READY
----------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initActiveNav();
  initStickyHeader();
  initContactForm();
});

/* -----------------------------------------------------
   SMOOTH SCROLL OFFSET FIX
----------------------------------------------------- */
function initSmoothScroll() {
  const navLinks = $$(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId.startsWith("#")) return;

      const target = $(targetId);
      if (!target) return;

      event.preventDefault();

      const headerOffset = $(".site-header")?.offsetHeight || 0;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });
}

/* -----------------------------------------------------
   ACTIVE NAV LINK ON SCROLL
----------------------------------------------------- */
function initActiveNav() {
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-links a");

  function onScroll() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  window.addEventListener("scroll", onScroll);
}

/* -----------------------------------------------------
   STICKY HEADER SHADOW ON SCROLL
----------------------------------------------------- */
function initStickyHeader() {
  const header = $(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* -----------------------------------------------------
   CONTACT FORM VALIDATION
----------------------------------------------------- */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(form);
    const errors = [];

    if (!formData.get("name")?.trim()) {
      errors.push("Name is required.");
    }

    if (!isValidEmail(formData.get("email"))) {
      errors.push("Please enter a valid email address.");
    }

    if (!formData.get("message")?.trim()) {
      errors.push("Message cannot be empty.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Simulated submission (replace with backend/API later)
    handleSuccessfulSubmit(form);
  });
}

/* -----------------------------------------------------
   HELPERS
----------------------------------------------------- */
function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleSuccessfulSubmit(form) {
  form.reset();
  alert("Thank you for your message. We will contact you shortly.");
}