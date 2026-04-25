document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.getElementById("burger");
  const closeIcon = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("burgerMenu");
  const menuLinks = document.querySelectorAll(".menu-link");

  // --- Открытие/Закрытие меню ---
  burgerIcon.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
    updateActiveLink(); // Обновляем активную ссылку при открытии
  });

  const closeMobileMenu = () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  closeIcon.addEventListener("click", closeMobileMenu);

  // --- Логика переключения активного пункта ---
  function updateActiveLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    menuLinks.forEach((link) => {
      link.classList.remove("active");

      // Получаем чистый путь из ссылки (например, index.html или services.html)
      const linkPath = link.getAttribute("href").split("#")[0];
      const linkHash = link.getAttribute("href").split("#")[1];

      // 1. Проверка по файлу (на какой мы странице)
      if (currentPath.includes(linkPath) && linkPath !== "") {
        link.classList.add("active");
      }
      // 2. Проверка по якорю (если мы на главной и скроллим секции)
      if (currentHash === "#" + linkHash && linkHash !== undefined) {
        menuLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
      // 3. Если главная страница без хеша
      if (currentPath.endsWith("/") || currentPath.endsWith("index.html")) {
        if (
          !currentHash &&
          link.getAttribute("href").includes("index.html#about")
        ) {
          // По умолчанию подсвечиваем первый пункт на главной
        }
      }
    });
  }

  // Закрытие при клике
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Отслеживание скролла для изменения активного пункта (для одностраничных переходов)
  const observerOptions = {
    threshold: 0.5,
  };

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

  // Следим за всеми секциями, у которых есть ID
  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.querySelector(".feedback-form");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      // 1. Отменяем стандартную отправку и перезагрузку страницы
      e.preventDefault();

      // Здесь в будущем можно добавить код для реальной отправки данных на почту
      console.log("Форма отправлена!");

      // 2. Очищаем все поля формы (инпуты и селекты)
      this.reset();

      // 3. Можно добавить уведомление для пользователя
      alert("Спасибо! Ваша заявка отправлена.");
    });
  }
});
