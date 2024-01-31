const loginDiv = document.getElementById('login');
const loginBar = document.getElementById('login-bar');
const signupDiv = document.getElementById('signup');
const signupBar = document.getElementById('signup-bar');
const logoutDiv = document.getElementById('logout');
const logoutBar = document.getElementById('logout-bar');
const myPageDiv = document.getElementById('my-page');
const myPageBar = document.getElementById('my-page-bar');

const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout');

let isLoggedIn = false;
if (document.cookie.includes('authorization')) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}

signupButton.addEventListener('click', () => {
  signup();
});

loginButton.addEventListener('click', () => {
  login();
});

logoutButton.addEventListener('click', async () => {
  try {
    const response = await axios.post(`http://52.79.88.29:3000/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    window.location.href = 'https://visitor17564.github.io/GOSAGI_front/index.html'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
});

export async function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const passwordConfirm = document.getElementById('signup-repeat-password').value;
  const nickname = document.getElementById('signup-nickname').value;

  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.post(
      'http://52.79.88.29:3000/user/signup',
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
    alert('회원가입 성공: ' + response);
    // 성공 시, 원하는 페이지로 리디렉션
    window.location.href = 'https://visitor17564.github.io/GOSAGI_front/index.html'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('회원가입 실패: ' + err);
  }
}

export async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.post(
      'http://52.79.88.29:3000/auth/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    alert('로그인 성공: ' + response);
    // 성공 시, 원하는 페이지로 리디렉션
    window.location.href = 'https://visitor17564.github.io/GOSAGI_front/index.html'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('로그인 실패: ' + err);
  }
}

function updateLoginButton() {
  if (isLoggedIn) {
    // 로그인 상태인 경우, 로그인 버튼을 숨깁니다.
    loginDiv.style.display = 'none';
    loginBar.style.display = 'none';
    signupDiv.style.display = 'none';
    signupBar.style.display = 'none';
    myPageDiv.style.display = 'block';
    myPageBar.style.display = 'block';
    logoutDiv.style.display = 'block';
    logoutBar.style.display = 'block';
  } else {
    // 로그인 상태가 아닌 경우, 로그인 버튼을 표시합니다.
    loginDiv.style.display = 'block';
    loginBar.style.display = 'block';
    signupDiv.style.display = 'block';
    signupBar.style.display = 'block';
    myPageDiv.style.display = 'none';
    myPageBar.style.display = 'none';
    logoutDiv.style.display = 'none';
    logoutBar.style.display = 'none ';
  }
}

updateLoginButton(isLoggedIn);
