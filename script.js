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

const modalOverlay = document.querySelector("#modal-overlay");
const modalSymbol = document.querySelector("#modal-symbol");
const modalTitle = document.querySelector("#modal-title");
const modalPrice = document.querySelector("#modal-price");
const modalContent = document.querySelector("#modal-content");
const modalWhatsapp = document.querySelector("#modal-whatsapp");
const modalClose = document.querySelector(".modal-close");
let lastFocusedElement = null;

function openModal(card) {
  const title = card.querySelector("h3").textContent;
  const template = card.querySelector("template.modal-body");

  modalSymbol.textContent = card.dataset.modalSymbol || "";
  modalTitle.textContent = title;
  modalPrice.textContent = card.dataset.modalPrice || card.dataset.price || "";
  modalContent.innerHTML = "";
  if (template) {
    modalContent.appendChild(template.content.cloneNode(true));
  }
  modalWhatsapp.onclick = () => {
    openWhatsApp(card.dataset.whatsappMessage || `Olá, Yohan! Quero solicitar um orçamento para ${card.dataset.service} (${card.dataset.price}).`);
    closeModal();
  };

  lastFocusedElement = document.activeElement;
  modalOverlay.hidden = false;
  requestAnimationFrame(() => modalOverlay.classList.add("open"));
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    modalOverlay.hidden = true;
  }, 250);
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".quote-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.closest(".reading-card"));
  });
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
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
