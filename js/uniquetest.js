// Получаем элементы
const dropZone = document.getElementById('drop_zone');
const dropZoneWindow = document.querySelector('.drop_zone_window');
const fileInput = document.getElementById('fileInput');
const resultList = document.getElementById('resultList');
const checkButton = document.getElementById('checkButton');
const urlInput = document.getElementById('urlInput');

const url = 'https://checker-zip-frantunn.amvera.io';
// const url = 'http://localhost:3000';

// Обработчик перетаскивания файла на dropZone
function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

// Обработчик выбора файла
function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  const files = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;
  if (files.length > 0) {
    sendFileToServer(files[0]);
  }
}

// Отправка файла на сервер
async function sendFileToServer(file) {
  const formData = new FormData();
  formData.append('siteZip', file);
  loader.style.display = 'block';

  try {
    const response = await fetch(`${url}/uniquetest`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    console.log('data:', data);
    updateResultList(data);
    loader.style.display = 'none';
  } catch (error) {
    console.error('Ошибка:', error);
    loader.style.display = 'none';
  }
}

// Обновление списка результатов на странице
function updateResultList(data) {
  resultList.innerHTML = ''; // Очищаем текущий список

  // Перебор данных для создания элементов списка с показателями в span
  data.forEach((item, index) => {
    const listItem = document.createElement('li');

    if (index > 0) {
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${item.name}`;
      listItem.appendChild(nameSpan);

      const uniqueSpan = document.createElement('span');
      uniqueSpan.innerHTML = ` | Уникальность: <b>${item.uniquePercentage} %</b>`;
      listItem.appendChild(uniqueSpan);
    } else {
      listItem.style.padding = '20px';
      listItem.style.border = 'none';
      listItem.style.pointerEvents = 'none';
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${item.name}`;
      nameSpan.style.fontWeight = '600';
      listItem.appendChild(nameSpan);
    }

    // Добавляем элемент списка в resultList
    resultList.appendChild(listItem);
  });
}

// Назначение обработчиков событий
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZoneWindow.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);

checkButton.addEventListener('click', async () => {
  const targetUrl = urlInput.value;
  console.log('Проверка URL: ', targetUrl);

  if (!targetUrl) {
    // Используйте targetUrl вместо url для проверки введенного адреса
    alert('Пожалуйста, введите URL сайта для проверки.');
    return;
  }

  loader.style.display = 'block';

  try {
    const response = await fetch(`${url}/uniquetest_url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteUrl: targetUrl }),
    });

    console.log('response:', response);
    if (!response.ok) {
      loader.style.display = 'none';
      throw new Error('Ошибка сети или сервера');
    }

    const data = await response.json();
    console.log('Результат проверки:', data);

    // Используйте updateResultList(data) для обновления списка результатов
    updateResultList(data);

    loader.style.display = 'none';
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    document.getElementById('result').textContent =
      'Ошибка при запросе: ' + error.message;
    loader.style.display = 'none';
  }
});
