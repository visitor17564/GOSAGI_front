import * as modalAPI from '../util/open-close-modal.js';

const $signUpBtn = document.getElementById('signup-btn');

document.getElementById('open-signup-seller-modal').addEventListener('click', async () => {
  await modalAPI.openModal('signup-seller-modal');
});

$signUpBtn.addEventListener('click', async () => {
  const name = document.getElementById('seller-name').value;
  const phone_number = document.getElementById('seller-phone').value;
  const business_number = document.getElementById('seller-number').value;
  const address = document.getElementById('seller-address').value;

  const fileInput = document.getElementById('signup-upload');
  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append('file', file);
  formData.append('name', name);
  formData.append('phone_number', phone_number);
  formData.append('business_number', business_number);
  formData.append('address', address);

  await axios
    .post('https://back.gosagi.com/store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then(function (response) {
      alert(response.data.data.message);
      location.reload();
    })
    .catch(function (error) {
      console.error(error);
    });
});
