const logoutButton = document.getElementById('logout');

// if (!document.cookie.includes('authorization')) {
//   alert('로그인 후 이용 가능합니다.');
//   // window.location.href = 'https://visitor17564.github.io/GOSAGI_front/';
// }

// 회원 로그인 여부 체크
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });

    $nicknameFix.innerText = response.data.data.nickname;
  } catch (err) {
    // 오류 처리
    alert(`${err.response.data.message}`);
    if (err.response.data.message === '로그인을 진행해주세요.') {
      window.location.href = 'https://visitor17564.github.io/GOSAGI_front/';
    }
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    const response = await axios.post(`https://back.gosagi.com/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    window.location.href = 'https://visitor17564.github.io/GOSAGI_front/'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
});
