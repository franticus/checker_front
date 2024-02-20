// Получаем элементы
const dropZone = document.getElementById('drop_zone');
const dropZoneWindow = document.querySelector('.drop_zone_window');
const fileInput = document.getElementById('fileInput');
const resultList = document.getElementById('resultList');

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
function sendFileToServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      updateResultList(data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

// Обновление списка результатов
function updateResultList(data) {
  resultList.innerHTML = '';
  const results = data
    .split(',')
    .map(result => result.trim().replace(/\n/g, ''));

  if (results.length === 1) {
    appendToList(results[0]);
    appendToList('Сканирование завершено, проблем не найдено');
  } else {
    results.forEach(result => {
      if (result !== '') {
        appendToList(result);
      }
    });
  }
}

// Добавление элемента в список
function appendToList(text) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  resultList.appendChild(listItem);
}

// Назначение обработчиков событий
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZoneWindow.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);
