const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

export function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    // axios를 사용하여 로그인 API 실행
    const response = axios.post(
      "http://localhost:3000/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    alert("로그인 성공: " + response);
    // 성공 시, 원하는 페이지로 리디렉션
    window.location.href = "http://localhost:5500/html/index.html"; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert("로그인 실패: " + err);
  }
}

export function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const passwordConfirm = document.getElementById(
    "signup-repeat-password"
  ).value;
  const nickname = document.getElementById("signup-nickname").value;

  try {
    // axios를 사용하여 로그인 API 실행
    const response = axios.post(
      "http://localhost:3000/user/signup",
      {
        email,
        password,
        passwordConfirm,
        nickname,
      },
      {
        withCredentials: true,
      }
    );
    alert("회원가입 성공: " + response);
    // 성공 시, 원하는 페이지로 리디렉션
    window.location.href = "http://localhost:5500/html/index.html"; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert("회원가입 실패: " + err);
  }
}

loginButton.addEventListener("click", () => {
  login();
});

signupButton.addEventListener("click", () => {
  signup();
});
