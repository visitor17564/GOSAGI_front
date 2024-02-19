document.addEventListener('DOMContentLoaded', async function () {
  getUser();
});

export async function getUser() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    let approvalStatus = 2;
    // 조회된 정보 적용
    if (response.data.data[0].store[0]) {
      approvalStatus = response.data.data[0].store[0].approval_status;
    }

    if (approvalStatus === 1) {
      window.location.href = '/html/seller/info.html';
    } else if (approvalStatus === 0) {
      window.location.href = '/html/seller/wait-signup.html';
    }
  } catch (err) {
    // 오류 처리
    // console.log(err);
  }
}
