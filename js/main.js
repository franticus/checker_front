document.addEventListener('DOMContentLoaded', function () {
  const themeSwitcher = document.getElementById('checkbox');

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

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

  let savedTheme = getCookie('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    themeSwitcher.checked = true;
  }

  themeSwitcher.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark-mode');
    let theme = document.documentElement.classList.contains('dark-mode')
      ? 'dark'
      : 'light';
    setCookie('theme', theme, 100);
  });
});
