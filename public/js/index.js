/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './auth';
import { displayMap } from './mapbox';

const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.login-form form.form');
const logoutButton = document.querySelector('a.nav__el.nav__el--logout');

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input#email').value;
    const password = e.target.querySelector('input#password').value;

    await login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
