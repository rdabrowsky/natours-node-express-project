/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './auth';
import { displayMap } from './mapbox';
import { updateData } from './updateSettings';

const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.login-form form.form');
const logoutButton = document.querySelector('a.nav__el.nav__el--logout');
const updateProfileForm = document.querySelector('form.form.form-user-data');

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

if (updateProfileForm) {
  updateProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input#email').value;
    const name = e.target.querySelector('input#name').value;

    await updateData(name, email);
  });
}
