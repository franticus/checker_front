document
  .getElementById('drop_zone')
  .addEventListener('drop', handleFileSelect, false);
document
  .getElementById('checkButton')
  .addEventListener('click', sendFileToServer, false);

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();

  var files = event.dataTransfer.files;
  document.getElementById('fileInput').files = files;
}

function sendFileToServer() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

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
  event.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
