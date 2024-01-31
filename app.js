document
  .getElementById('drop_zone')
  .addEventListener('drop', handleFileSelect, false);

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  const files = event.dataTransfer.files;

  sendFileToServer(files[0]);
}

function sendFileToServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      const resultList = document.getElementById('resultList');
      resultList.innerHTML = '';

      const results = data
        .split(',')
        .map(result => result.trim().replace(/\n/g, ''));
      console.log('results:', results);

      if (results.length === 1 && results[0] === '') {
        const listItem = document.createElement('li');
        listItem.textContent = 'Сканирование завершено, проблем не найдено';
        resultList.appendChild(listItem);
      } else {
        results.forEach(result => {
          if (result !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = result;
            resultList.appendChild(listItem);
          }
        });
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

const dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
