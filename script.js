document.addEventListener("DOMContentLoaded", function () {
  // --- ЭЛЕМЕНТЫ МЕНЮ ---
  const burgerIcon = document.getElementById("burger");
  const closeIcon = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("burgerMenu");
  const menuLinks = document.querySelectorAll(".menu-link");

  // --- ЭЛЕМЕНТЫ ПОРТФОЛИО ---
  const searchInput = document.getElementById("portfolioSearch");
  const searchBtn = document.querySelector(".search-btn"); // Золотая кнопка
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

  // --- ЛОГИКА ПОРТФОЛИО (ПОИСК И ФИЛЬТРАЦИЯ) ---
  function updatePortfolio() {
    if (!cards.length) return; // Если мы не на странице портфолио, выходим

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

      // Показываем карточку, если она проходит и поиск, и фильтр
      if (matchesSearch && matchesFilter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Слушатели для поиска
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

  // Слушатели для фильтров
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updatePortfolio();
    });
  });

  // --- ОСТАЛЬНОЕ (IntersectionObserver и Форма) ---
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
      console.log("Форма отправлена!");
      this.reset();
      alert("Спасибо! Ваша заявка отправлена.");
    });
  }
});
