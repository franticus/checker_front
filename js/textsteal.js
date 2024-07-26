import { apiUrl } from './key.js';

document.addEventListener('DOMContentLoaded', function () {
  const stealButton = document.getElementById('stealButton');
  const applyButton = document.getElementById('applyButton');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const loader = document.getElementById('loader');
  const errorMessage = document.getElementById('errorMessage');

  stealButton.addEventListener('click', function () {
    errorMessage.textContent = '';
    loader.style.display = 'block';

    fetch(`${apiUrl}/steal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: inputText.value }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Сетевая ошибка');
        }
        return response.json();
      })
      .then(data => {
        outputText.value = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        errorMessage.textContent = `Ошибка: ${error.message}`;
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });

  applyButton.addEventListener('click', function () {
    errorMessage.textContent = '';
    loader.style.display = 'block';

    try {
      const replacements = JSON.parse(outputText.value);
      fetch(`${apiUrl}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent: inputText.value, replacements }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Сетевая ошибка');
          }
          return response.json();
        })
        .then(data => {
          inputText.value = data.updatedHtml;
        })
        .catch(error => {
          errorMessage.textContent = `Ошибка: ${error.message}`;
        })
        .finally(() => {
          loader.style.display = 'none';
        });
    } catch (error) {
      errorMessage.textContent = 'Ошибка: Неверный формат JSON';
      loader.style.display = 'none';
    }
  });
});
