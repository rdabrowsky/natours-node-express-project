import axios from 'axios';
import { showAlert } from './alerts';
import { API_URL } from './const';

// eslint-disable

// type is either 'password' or 'data'
export const updateSettings = async (data, type = 'data') => {
  try {
    const url =
      type === 'password'
        ? `${API_URL}/users/update-password`
        : `${API_URL}/users/update-me`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
