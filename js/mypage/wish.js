// DOM 요소들
const $wishList = document.getElementById('wish-list');

// 찜 목록 불러오기
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/wish', {
      withCredentials: true,
    });
    const wishs = response.data.data.data;
    let count = 0;
    if (wishs.length >= 1) {
      $wishList.innerHTML = '';
      wishs.forEach((wish) => {
        count++;

        let pushCart = '';
        if (wish.productStoreId === 1 || wish.productStoreId === 2) {
          pushCart = 'hidden ';
        }
        let onlyForSale = 'hidden ';
        if (wish.productPoint.toLocaleString() !== 0) {
          onlyForSale = '';
        }

        let tempHtml = `
          <tr id="wish-id-${wish.id}" class="border-b">
            <td class="h-full mx-6 my-auto font-['Inter'] flex items-center justify-start">
              <a class="flex justify-center items-center" href="/html/search/detail.html?productId=${wish.product_id}" >
                <img src="${wish.productThumbnail}" class="aspect-square w-24 h-auto" />
                <div class="w-full ml-5">${wish.productName}</div>
              </a>
            </td>
            <td class="mx-6 my-auto font-['Inter'] text-center">
              <div class="${onlyForSale}flex justify-end items-center">
                <div class="text-right">답례품 포인트가</div>
                <div class="text-right ml-5 text-2xl">${wish.productPoint.toLocaleString()}</div>
              </div>
              <div class="${pushCart}flex justify-end items-center">
                <div class="text-right">실구매가</div>
                <div class="text-right ml-5 text-2xl text-red-600"><strong>${wish.productPrice.toLocaleString()}</strong></div>
              </div>
            </td>
            <td class="px-2 py-4 font-['Inter'] text-center">
            <div class="flex flex-col items-center justify-center font-['Inter']">
              <button class="h-5 px-4 w-32 hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 bg-white rounded-lg font-['Inter']">
                <a href="https://ilovegohyang.go.kr/items/details-main.html?code=G${wish.productCode}">기부하러가기</a>
              </button>
              <button id="cart-btn-${wish.id}-${wish.product_id}" class="${pushCart}cart-btn h-5 px-4 w-32 hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 bg-white rounded-lg font-['Inter']">장바구니담기</button>
              <button id="wish-delete-btn-${wish.id}" class="wish-delete-btn h-5 px-4 w-32 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 bg-white rounded-lg font-['Inter']">찜 취소</button>
            </div>
          </td>
          </tr>
          `;

        $wishList.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (wishs.length === 0) {
      let tempHtml = '<div> 찜 내역이 존재하지 않습니다 </div>';
      $wishList.insertAdjacentHTML('beforeend', tempHtml);
    }

    deleteWish();
    createCart();
  } catch (err) {
    alert(err.response.data.message);
  }
});

// 장바구니에 추가하기
async function createCart() {
  const $cartBtns = document.querySelectorAll('.cart-btn');

  $cartBtns.forEach(function (button) {
    button.addEventListener('click', async function (e) {
      const wishId = e.target.id.split('-')[2]; // 찜 ID 추출
      const productId = e.target.id.split('-')[3]; // 찜 ID 추출
      // 장바구니 추가 API
      try {
        // // 찜에서 삭제 후 장바구니에 추가
        // const responseWish = await axios.delete(`https://back.gosagi.com/wish/login/${wishId}`, {
        //   withCredentials: true,
        // });

        const responseCart = await axios.post(
          `https://back.gosagi.com/cart`,
          {
            product_id: productId,
            quantity: 1,
          },
          {
            withCredentials: true,
          },
        );

        // // 장바구니에 추가한 상품 html 제거
        // document.getElementById(`wish-id-${wishId}`).remove();

        alert(responseCart.data.message);
        window.location.href = '/html/mypage/cart.html';
      } catch (err) {
        alert(responseCart.data.message);
      }
    });
  });
}

// 기부하기 사이트로 연결하기

// 찜 취소하기
async function deleteWish() {
  const $deleteBtns = document.querySelectorAll('.wish-delete-btn');

  $deleteBtns.forEach(function (button) {
    button.addEventListener('click', async function (e) {
      const wishId = e.target.id.split('-')[3]; // 찜 ID 추출
      // 찜 삭제 API
      try {
        const response = await axios.delete(`https://back.gosagi.com/wish/login/${wishId}`, {
          withCredentials: true,
        });

        // 삭제한 상품 html 제거
        document.getElementById(`wish-id-${wishId}`).remove();

        alert(response.data.message);
      } catch (err) {
        alert(err.response.data.message);
      }
    });
  });
}
