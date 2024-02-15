export async function generateProductWish(wishCount, wishCheck) {
  const wishDiv = document.getElementById('wish-div');
  let fill = 'none';
  let stroke = 'currentColor';

  if (wishCheck.isMyWish === true) {
    fill = '#ff0000';
    stroke = '#ff0000';
    wishDiv.innerHTML = `<div title="wish-${wishCheck.isMyWish}=${wishCheck.myWishId}">
    <svg id="wish-${wishCheck.isMyWish}=${wishCheck.myWishId}" xmlns="http://www.w3.org/2000/svg" fill="${fill}" viewBox="0 0 24 24" stroke-width="1.5" stroke="${stroke}" class="w-6 h-6">
      <path id="path-wish-${wishCheck.isMyWish}=${wishCheck.myWishId}" stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
    </div>
    <div title="wish-${wishCheck.isMyWish}=${wishCheck.myWishId}" class="justify-center text-black text-center text-xs self-stretch whitespace-nowrap font-['Inter']">${wishCount}</div>
    `;
  } else {
    wishDiv.innerHTML = `<div title="wish-${wishCheck.isMyWish}=${wishCheck.myWishId}">
    <svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" viewBox="0 0 24 24" stroke-width="1.5" stroke="${stroke}" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
    </div>
    <div class="justify-center text-black text-center text-xs self-stretch whitespace-nowrap font-['Inter']">${wishCount}</div>
    `;
  }
}

export async function getProductWishCount(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const wishCount = await axios.get(`https://back.gosagi.com/wish/count/${productId}`, { withCredentials: true });
    return wishCount.data.data.wishes_count;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export async function checkIsMyWish(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const wishCheck = await axios.get(`https://back.gosagi.com/wish/mine/${productId}`, { withCredentials: true });
    return wishCheck.data.data;
  } catch (err) {
    // 오류 처리
    return;
  }
}

export async function changeWish(userId, wishCount, productId) {
  const wishCheck = await checkIsMyWish(productId);
  if (userId) {
    try {
      if (wishCheck.isMyWish === false) {
        try {
          await axios.post(`https://back.gosagi.com/wish`, { product_id: productId }, { withCredentials: true });
          alert('찜하기 성공');
          const reWishCheck = await checkIsMyWish(productId);
          const reWishCount = await getProductWishCount(productId);
          await generateProductWish(reWishCount, reWishCheck);
        } catch (err) {
          alert('오류발생: ' + err.response.data.message);
        }
      } else if (wishCheck.isMyWish === true) {
        try {
          await axios.delete(`https://back.gosagi.com/wish/login/${wishCheck.myWishId}`, { withCredentials: true });
          alert('찜취소 성공');
          const reWishCheck = await checkIsMyWish(productId);
          const reWishCount = await getProductWishCount(productId);
          await generateProductWish(reWishCount, reWishCheck);
        } catch (err) {
          console.log(err);
          alert('오류발생: ' + err.response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    alert('찜하기는 로그인 후에 가능합니다.');
  }
}
