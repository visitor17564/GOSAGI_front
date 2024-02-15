const $secessionBtn = document.getElementById('secession-btn');
const $nicknameFix = document.getElementById('nickname-fix');
const cartDiv = document.getElementById('cart');

// 회원탈퇴
$secessionBtn.addEventListener('click', async function (event) {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    try {
      // 회원 탈퇴 API 실행
      const response = await axios.delete('https://back.gosagi.com/user', {
        withCredentials: true,
      });

      alert(response.data.message);
      window.location.href = '/';
    } catch (err) {
      // 오류 처리
      alert(err.response.data.message);
    }
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const user = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    $nicknameFix.innerText = user.data.data[0].nickname;
    // 조회된 정보 적용
  } catch (err) {
    alert('로그인을 진행해주세요');
    window.location.href = '/';
  }
});
