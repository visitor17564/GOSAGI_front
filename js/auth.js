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
    alert('계정을 확인해주세요');
  }
}

// 로그인 모달
export async function openLoginModal() {
  const $loginModal = document.getElementById('login-modal');
  $loginModal.classList.remove('hidden');
  $loginModal.classList.add('flex');
  $loginModal.classList.add('bg-gray-500/75');
  document.addEventListener('click', (event) => {
    if (event.target.id === 'login-modal') {
      closeLoginModal();
    }
  });
}

export async function closeLoginModal() {
  const $loginModal = document.getElementById('login-modal');
  $loginModal.classList.add('hidden');
  $loginModal.classList.remove('flex');
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

// 회원가입(선택) 모달
export async function openSignupModal() {
  const $signupModal = document.getElementById('signup-modal');
  $signupModal.classList.remove('hidden');
  $signupModal.classList.add('flex');
  $signupModal.classList.add('bg-gray-500/75');
  document.addEventListener('click', (event) => {
    if (event.target.id === 'signup-modal') {
      closeSignupModal();
    }
  });
}

export async function closeSignupModal() {
  const $signupModal = document.getElementById('signup-modal');
  $signupModal.classList.add('hidden');
  $signupModal.classList.remove('flex');
}

// 회원가입(직접입력) 모달
export async function openSignupCustomModal() {
  closeSignupModal();
  const $signupModal = document.getElementById('signup-custom-modal');
  $signupModal.classList.remove('hidden');
  $signupModal.classList.add('flex');
  $signupModal.classList.add('bg-gray-500/75');
  document.addEventListener('click', (event) => {
    if (event.target.id === 'signup-custom-modal') {
      closeSignupCustomModal();
    }
  });
}

export async function closeSignupCustomModal() {
  const $signupModal = document.getElementById('signup-custom-modal');
  $signupModal.classList.add('hidden');
  $signupModal.classList.remove('flex');
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
