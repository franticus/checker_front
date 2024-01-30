document
  .getElementById('drop_zone')
  .addEventListener('drop', handleFileSelect, false);
document
  .getElementById('checkButton')
  .addEventListener('click', sendFileToServer, false);

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  var files = event.dataTransfer.files; // FileList object.

  // files - это список File объектов. Выведем их в консоль.
  for (var i = 0, f; (f = files[i]); i++) {
    console.log(f.name);
  }
}

function sendFileToServer() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  // Отправка файла на сервер (используется Fetch API)
  var formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById('result').textContent = data;
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Настройка обработчика событий для перетаскивания файлов
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
