const logoutButton = document.getElementById('logout');
const $secessionBtn = document.getElementById('secession-btn');
const $nicknameFix = document.getElementById('nickname-fix');
const cartDiv = document.getElementById('cart');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await axios.post(`https://back.gosagi.com/auth/logout`, {}, { withCredentials: true });
    alert('로그아웃 성공');
    window.location.href = '/'; // 수정할 URL로 변경 필요
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
});

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

export function drawCartCount(cartsCount) {
  cartDiv.innerHTML = `<button class="text-center text-white text-xs font-normal font-['Inter']"><a href="/html/mypage/cart.html">장바구니(${cartsCount})</a></button>`;
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 장바구니조회 API 실행
    const response = await axios.get('https://back.gosagi.com/cart', {
      withCredentials: true,
    });

    const user = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    console.log(user.data.data);
    $nicknameFix.innerText = user.data.data[0].nickname;

    const cartsCount = response.data.data.cart_count;
    drawCartCount(cartsCount);
    // 조회된 정보 적용
  } catch (err) {
    alert('로그인을 진행해주세요');
    console.log(err);
    // window.location.href = '/';
  }
});
