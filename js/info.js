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
      console.log('response:', response);
      if (response.ok) {
        return response.text();
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
