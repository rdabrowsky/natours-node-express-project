/* eslint-disable */

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

document
  .querySelector('.login-form form.form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input#email').value;
    const password = e.target.querySelector('input#password').value;

    await login(email, password);
  });
