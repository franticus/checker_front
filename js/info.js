import { apiUrl } from './key.js';

const resetUploadsButton = document.getElementById('resetUploadsButton');
const cleanNonNewFilesButton = document.getElementById('cleanNonNewFilesBtn');
const transferOldToDataBaseBtn = document.getElementById(
  'transferOldToDataBaseBtn'
);

resetUploadsButton.addEventListener('click', async function () {
  try {
    const response = await fetch(`${apiUrl}/cleanuploads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('response:', response);

    if (response.ok) {
      const data = await response.text();
      console.log(data);
    } else {
      console.error(
        'Server responded with an error:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

cleanNonNewFilesButton.addEventListener('click', async function () {
  try {
    const response = await fetch(`${apiUrl}/cleanNonNewFiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('response:', response);

    if (response.ok) {
      const data = await response.text();
      console.log(data);
    } else {
      console.error(
        'Server responded with an error:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

transferOldToDataBaseBtn.addEventListener('click', async function () {
  try {
    const response = await fetch(`${apiUrl}/transferOldFiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Files have been transferred successfully.');
    } else {
      console.error(
        'Server responded with an error:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
