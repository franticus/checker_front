import { apiUrl } from './key.js';

document
  .getElementById('nameCheckButton')
  .addEventListener('click', function () {
    const companyName = document.getElementById('companyName').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    if (companyName.trim() === '') {
      errorMessage.textContent = 'Пожалуйста, введите название компании.';
      return;
    }

    const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;
    if (!pascalCaseRegex.test(companyName)) {
      errorMessage.textContent =
        'Название компании должно быть в стиле PascalCase.';
      return;
    }

    document.getElementById('loader').style.display = 'block';

    fetch(`${apiUrl}/namecheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName }),
    })
      .then(response => response.json())
      .then(result => {
        document.getElementById('loader').style.display = 'none';
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = `<li>${result.message}</li>`;
        if (result.similar && result.similar.length > 0) {
          resultList.innerHTML += `<li>Максимально похожие названия:</li>`;
          result.similar.forEach(name => {
            resultList.innerHTML += `<li>${name}</li>`;
          });
        }
      })
      .catch(error => {
        document.getElementById('loader').style.display = 'none';
        errorMessage.textContent = 'Произошла ошибка при проверке имени';
        console.error('Ошибка:', error);
      });
  });
