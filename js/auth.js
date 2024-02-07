const loginDiv = document.getElementById('login-div');
const loginBar = document.getElementById('login-bar');
const signupDiv = document.getElementById('signup-div');
const signupBar = document.getElementById('signup-bar');
const logoutDiv = document.getElementById('logout-div');
const logoutBar = document.getElementById('logout-bar');
const myPageDiv = document.getElementById('my-page-div');
const myPageBar = document.getElementById('my-page-bar');
const cartDiv = document.getElementById('cart');
const cartBar = document.getElementById('cart-bar');

const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout');

let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 장바구니조회 API 실행
    const response = await axios.get('https://back.gosagi.com/cart', {
      withCredentials: true,
    });
    const cartsCount = response.data.data.cart_count;
    drawCartCount(cartsCount);
    isLoggedIn = true;
    updateLoginButton(isLoggedIn);
    // 조회된 정보 적용
  } catch (err) {
    // 오류 처리
    updateLoginButton(isLoggedIn);
  }
});

signupButton.addEventListener('click', () => {
  signup();
});

loginButton.addEventListener('click', () => {
  login();
});

logoutButton.addEventListener('click', async () => {
  try {
    const response = await axios.post(`https://back.gosagi.com/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    location.reload(); // 새로고침
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
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

export async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    // axios를 사용하여 로그인 API 실행
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

export function updateLoginButton() {
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
    cartDiv.style.display = 'block';
    cartBar.style.display = 'block';
  } else {
    // 로그인 상태가 아닌 경우, 로그인 버튼을 표시합니다.
    // loginDiv.style.display = 'block';
    // loginBar.style.display = 'block';
    // signupDiv.style.display = 'block';
    // signupBar.style.display = 'block';
    myPageDiv.style.display = 'none';
    myPageBar.style.display = 'none';
    logoutDiv.style.display = 'none';
    logoutBar.style.display = 'none ';
    cartDiv.style.display = 'none';
    cartBar.style.display = 'none';
  }
}

export function drawCartCount(cartsCount) {
  cartDiv.innerHTML = `<button class="text-center text-white text-xs font-normal font-['Inter']"><a href="/html/mypage/cart.html">장바구니(${cartsCount})</a></button>`;
}
