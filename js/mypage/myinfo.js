// DOM 요소들
const $userId = document.getElementById('user-id');
const $nickname = document.getElementById('nickname');
const $nicknameFix = document.getElementById('nickname-fix');
const $currentPassword = document.getElementById('current-password');
const $newPassword = document.getElementById('new-password');

const $nicknameEditBtn = document.getElementById('nickname-edit-btn');
const $passwordEditBtn = document.getElementById('password-edit-btn');

// 내 정보 조회
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });

    // 조회된 정보 적용
    const userInfo = response.data.data[0];
    $userId.innerText = userInfo.email;
    $nickname.value = userInfo.nickname;
  } catch (err) {
    // 오류 처리
    alert(`${err.response.data.message}`);
  }
});

// 내 정보 수정
$nicknameEditBtn.addEventListener('click', async function (event) {
  try {
    // 내 정보 수정 API 실행
    const response = await axios.patch(
      'https://back.gosagi.com/user',
      {
        nickname: $nickname.value,
      },
      {
        withCredentials: true,
      },
    );

    // 수정된 정보 적용
    const userInfo = response.data.data;
    $nicknameFix.innerText = userInfo.nickname;

    alert(response.data.message);
  } catch (err) {
    // 오류 처리
    alert(err.response.data.message);
  }
});

// 비밀번호 수정
$passwordEditBtn.addEventListener('click', async function (event) {
  try {
    // 비밀번호 수정 API 실행
    const response = await axios.patch(
      'https://back.gosagi.com/user/password',
      {
        currentPassword: $currentPassword.value,
        newPassword: $newPassword.value,
      },
      {
        withCredentials: true,
      },
    );

    // 입력한 정보들 초기화
    $currentPassword.value = '';
    $newPassword.value = '';

    alert(response.data.message);
  } catch (err) {
    // 오류 처리
    alert(err.response.data.message);
  }
});
