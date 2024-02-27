const resetUploadsButton = document.getElementById('resetUploadsButton');

const url = 'https://checker-zip-frantunn.amvera.io';
// const url = 'http://localhost:3000';

resetUploadsButton.addEventListener('click', function () {
  fetch(`${url}/cleanuploads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Something went wrong on server');
    })
    .then(data => {
      console.log(data);
      console.log('Uploads directory has been cleared successfully.');
    })
    .catch(error => {
      console.error('Error:', error);
      console.log('Error clearing uploads directory');
    });
});
