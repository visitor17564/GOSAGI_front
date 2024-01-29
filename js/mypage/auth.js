const logoutButton = document.getElementById('logout');

if (!document.cookie.includes('authorization')) {
  alert('로그인 후 이용 가능합니다.');
  // window.location.href = 'http://localhost:5500/html/index.html';
}

logoutButton.addEventListener('click', async () => {
  try {
    const response = await axios.post(`http://localhost:3000/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    window.location.href = 'http://localhost:5500/html/index.html'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
});
