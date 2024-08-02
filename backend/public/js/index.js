/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './auth';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';
import { bookTour } from './stripe';

const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.login-form form.form');
const logoutButton = document.querySelector('a.nav__el.nav__el--logout');
const updateProfileForm = document.querySelector('form.form.form-user-data');
const changePasswordForm = document.querySelector(
  'form.form.form-user-password',
);
const bookTourButton = document.querySelector('button#book-tour');

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

    const form = new FormData();

    form.append('email', e.target.querySelector('input#email').value);
    form.append('name', e.target.querySelector('input#name').value);
    form.append('photo', e.target.querySelector('input#photo').files[0]);

    await updateSettings(form);
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = e.target.querySelector(
      'input#password-current',
    ).value;
    const newPassword = e.target.querySelector('input#password').value;
    const passwordConfirm = e.target.querySelector(
      'input#password-confirm',
    ).value;

    if (newPassword !== passwordConfirm) {
      showAlert('error', 'New password must be same as confirm password');
    }
    await updateSettings(
      { currentPassword, newPassword, passwordConfirm },
      'password',
    );

    e.target.reset();
  });
}

if (bookTourButton) {
  bookTourButton.addEventListener('click', async ({ target }) => {
    target.textContent = `Processing...`;
    const { tourId } = target.dataset;

    await bookTour(tourId);
  });
}
