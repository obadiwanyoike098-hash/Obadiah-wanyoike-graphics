/*
  WEBSITE SETTINGS
  Add your WhatsApp number later using Kenya's international format:
  2547XXXXXXXX (digits only; no +, spaces, or dashes).
  Example only: const WHATSAPP_NUMBER = "2547XXXXXXXX";
*/
const WHATSAPP_NUMBER = ""; // Add your own number between the quotes when ready.

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    portfolioCards.forEach(card => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

portfolioCards.forEach(card => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.querySelector("img").alt;
    lightboxTitle.textContent = card.dataset.title;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");
    select.value = link.dataset.service;
  });
});
document.querySelectorAll("[data-package]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("projectDetails").value = "I would like to enquire about the " + link.dataset.package + " package. Please share the price and details.";
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const details = document.getElementById("projectDetails").value.trim();
  const note = document.getElementById("formNote");

  if (!name || !service || !details) {
    note.textContent = "Please complete all fields before continuing.";
    return;
  }
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    note.textContent = "Your form is ready, but WhatsApp is not connected yet. Add your business number in script.js, then try again. Your details have not been sent or stored.";
    return;
  }
  const message = `Hello Obadiah, my name is ${name}. I am interested in: ${service}. Project details: ${details}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
