const whatsappNumber = "5512992603886";

function openWhatsApp(message) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(link.dataset.whatsapp)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll(".card-expand").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".reading-card");
    const shouldOpen = !card.classList.contains("open");

    document.querySelectorAll(".reading-card.open").forEach((openCard) => {
      openCard.classList.remove("open");
      openCard.querySelector(".card-expand").setAttribute("aria-expanded", "false");
    });

    if (shouldOpen) {
      card.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.querySelectorAll(".quote-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".reading-card");
    const service = card.dataset.service;
    const price = card.dataset.price;
    openWhatsApp(`Olá, Yohan! Quero solicitar um orçamento para o serviço ${service} (${price}).`);
  });
});

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open", !expanded);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  });
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      document.querySelectorAll("details[open]").forEach((other) => {
        if (other !== detail) other.open = false;
      });
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
