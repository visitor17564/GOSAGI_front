// ---------- 메서드 ----------
// 로그인
export async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // 로그인 API 실행
    const response = await axios.post(
      'https://back.gosagi.com/auth/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    alert('로그인 성공');
    location.reload(); // 새로고침
  } catch (err) {
    // 오류 처리
    alert('로그인 실패: ' + err.response.data.message);
  }
}

// 회원가입
export async function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const passwordConfirm = document.getElementById('signup-repeat-password').value;
  const nickname = document.getElementById('signup-nickname').value;

  try {
    // 회원가입 API 실행
    const response = await axios.post(
      'https://back.gosagi.com/user/signup',
      {
        email,
        password,
        passwordConfirm,
        nickname,
      },
      {
        withCredentials: true,
      },
    );
    alert('회원가입 성공');
    // 성공 시, 원하는 페이지로 리디렉션
    location.reload(); // 새로고침
  } catch (err) {
    // 오류 처리
    alert('회원가입 실패: ' + err.response.data.message);
  }
}

// 로그아웃 버튼 클릭
export async function logout() {
  console.log('로그아웃');
  try {
    const response = await axios.post(`https://back.gosagi.com/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    location.reload(); // 새로고침
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}
