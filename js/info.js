const resetUploadsButton = document.getElementById('resetUploadsButton');
const cleanNonNewFilesButton = document.getElementById('cleanNonNewFilesBtn');
const transferOldToDataBaseBtn = document.getElementById(
  'transferOldToDataBaseBtn'
);

const url = 'https://checker-zip-frantunn.amvera.io';
// const url = 'http://localhost:3000';

resetUploadsButton.addEventListener('click', async function () {
  try {
    const response = await fetch(`${url}/cleanuploads`, {
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
    const response = await fetch(`${url}/cleanNonNewFiles`, {
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
    const response = await fetch(`${url}/transferOldFiles`, {
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
