const $signUpBtn = document.getElementById('signup-btn');
const $cancellation = document.getElementById('cancellation');
let storeId;

document.addEventListener('DOMContentLoaded', async function () {
  await getStoreId();
});

$cancellation.addEventListener('click', async () => {
  try {
    await axios.delete(`https://back.gosagi.com/store/${storeId}`, {
      withCredentials: true,
    });
    alert('신청을 취소하였습니다.');
    window.location.href = '/html/seller/non-signup.html';
  } catch (err) {
    alert('오류발생: ' + err.response.data.message);
    console.log(err);
  }
});

async function getStoreId() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    storeId = response.data.data[0].store[0].id;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}
