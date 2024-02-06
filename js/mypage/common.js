// DOM 요소들
const $nicknameFix = document.getElementById('nickname-fix');
const $secessionBtn = document.getElementById('secession-btn');

// 회원 로그인 여부 체크
// document.addEventListener('DOMContentLoaded', async function () {
//   try {
//     // 회원정보 조회 API 실행
//     const response = await axios.get('https://back.gosagi.com/user', {
//       withCredentials: true,
//     });

//     $nicknameFix.innerText = response.data.data.nickname;
//   } catch (err) {
//     // 오류 처리
//     alert(`${err.response.data.message}`);
//     if (err.response.data.message === "로그인을 진행해주세요.") {
//       window.location.href = "https://visitor17564.github.io/GOSAGI_front/";
//     }
//   }
// });

// 내 정보 수정
$secessionBtn.addEventListener('click', async function (event) {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    try {
      // 회원 탈퇴 API 실행
      const response = await axios.delete('https://back.gosagi.com/user', {
        withCredentials: true,
      });

      alert(response.data.message);
      window.location.href = './';
    } catch (err) {
      // 오류 처리
      alert(err.response.data.message);
    }
  }
});
