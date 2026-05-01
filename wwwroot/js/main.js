(function () {
  "use strict";

  const nav = document.getElementById("mainNav");
  const menuButton = document.getElementById("hamBtn");
  const navLinks = document.getElementById("navLinks");
  const modal = document.getElementById("modalOverlay");
  const closeButton = modal.querySelector("[data-close-modal]");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }

  function openModal() {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector("input, select, textarea, button").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    },
    { passive: true }
  );

  menuButton.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
  });

  document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const offset = nav.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setMenu(false);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "Sending...";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = "Sent. We will be in touch.";

        window.setTimeout(() => {
          form.reset();
          button.textContent = originalText;
          button.disabled = false;

          if (form.closest(".modal-box")) {
            closeModal();
          }
        }, 1800);
      }, 800);
    });
  });
})();
