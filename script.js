document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.getElementById("burger");
  const closeIcon = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("burgerMenu");
  const menuLinks = document.querySelectorAll(".menu-link"); // Все ссылки в меню

  // Открытие меню
  burgerIcon.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Функция закрытия меню
  const closeMobileMenu = () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  closeIcon.addEventListener("click", closeMobileMenu);

  // Логика для ссылок
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // 1. Убираем класс active у всех ссылок в меню
      menuLinks.forEach((item) => item.classList.remove("active"));

      // 2. Добавляем класс active той ссылке, на которую нажали
      link.classList.add("active");

      // 3. Закрываем меню
      closeMobileMenu();
    });
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

document.addEventListener("DOMContentLoaded", function () {
  // Выбираем вообще все ссылки на странице
  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Если ссылка ведет просто на "#" (пустышка)
      if (href === "#") {
        e.preventDefault(); // Отменяем перезагрузку/переход
        console.log("Нажата кнопка-заглушка, перезагрузка отменена");
      }

      // Если ссылка ведет на конкретный ID (якорь, например #feedback или #about)
      // Браузер сам проскроллит страницу вниз без перезагрузки.
    });
  });
});
