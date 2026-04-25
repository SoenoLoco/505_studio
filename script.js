document.addEventListener("DOMContentLoaded", function () {
  // --- ЭЛЕМЕНТЫ МЕНЮ ---
  const burgerIcon = document.getElementById("burger");
  const closeIcon = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("burgerMenu");
  const menuLinks = document.querySelectorAll(".menu-link");

  // --- ЭЛЕМЕНТЫ ПОРТФОЛИО ---
  const searchInput = document.getElementById("portfolioSearch");
  const searchBtn = document.querySelector(".search-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".portfolio-card");

  // --- Открытие/Закрытие меню ---
  if (burgerIcon && mobileMenu) {
    burgerIcon.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";
      updateActiveLink();
    });
  }

  const closeMobileMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  if (closeIcon) closeIcon.addEventListener("click", closeMobileMenu);

  // --- Логика переключения активного пункта меню ---
  function updateActiveLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    menuLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = href.split("#")[0];
      const linkHash = href.split("#")[1];
      if (currentPath.includes(linkPath) && linkPath !== "") {
        link.classList.add("active");
      }
      if (currentHash === "#" + linkHash && linkHash !== undefined) {
        menuLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // --- ЛОГИКА ПОРТФОЛИО ---
  function updatePortfolio() {
    if (!cards.length) return;
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const activeFilter = activeFilterBtn
      ? activeFilterBtn.dataset.filter
      : "all";

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const category = card.dataset.category;
      const matchesSearch = title.includes(searchText);
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      card.style.display = matchesSearch && matchesFilter ? "flex" : "none";
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updatePortfolio();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        updatePortfolio();
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updatePortfolio();
    });
  });

  // --- ЛОГИКА ПРОФИЛЯ (АККОРДЕОН) ---
  const accordionHeader = document.getElementById("myProjectsToggle");
  const accordionContent = document.getElementById("myProjectsContent");
  const accordionWrapper = accordionHeader
    ? accordionHeader.closest(".accordion")
    : null;

  if (accordionHeader && accordionContent) {
    accordionHeader.addEventListener("click", () => {
      accordionWrapper.classList.toggle("active");
      if (accordionWrapper.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = "0";
      }
    });
  }

  // --- ФОРМА И НАБЛЮДАТЕЛЬ ---
  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        menuLinks.forEach((link) => {
          if (link.getAttribute("href").includes("#" + id)) {
            menuLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });

  const feedbackForm = document.querySelector(".feedback-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      this.reset();
      alert("Спасибо! Ваша заявка отправлена.");
    });
  }
});
