import { apiUrl } from './key.js';

const dropZone = document.getElementById('drop_zone');
const dropZoneWindow = document.querySelector('.drop_zone_window');
const fileInput = document.getElementById('fileInput');
const resultList = document.getElementById('resultList');

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}

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

async function sendFileToServer(file) {
  const formData = new FormData();
  formData.append('siteZip', file);
  loader.style.display = 'block';

  try {
    const response = await fetch(`${apiUrl}/uniquetest`, {
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

function updateResultList(data) {
  resultList.innerHTML = '';

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

    resultList.appendChild(listItem);
  });
}

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
dropZoneWindow.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);
