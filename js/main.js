document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('href') === currentPage) {
      tab.classList.add('active');
    }
  });

  const themeSwitcher = document.getElementById('checkbox');

  // Функция для установки куки
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  // Функция для получения куки
  function getCookie(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Проверяем, сохранена ли тема в куки, и применяем её
  let savedTheme = getCookie('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitcher.checked = true;
  }

  // Слушатель события для переключателя
  themeSwitcher.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    let theme = document.body.classList.contains('dark-mode')
      ? 'dark'
      : 'light';
    setCookie('theme', theme, 7); // Сохраняем выбранную тему на 7 дней
  });
});
