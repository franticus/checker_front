const url = 'https://checkerzip-myfirst27.amvera.io';
const urlDev = 'http://localhost:80';

const currentUrl = window.location.href;

const apiUrl = currentUrl.includes('checkersite') ? url : urlDev;

export { apiUrl };
