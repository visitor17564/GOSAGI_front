// DOM 요소들
const $cartList = document.getElementById('cart-list');
const $totalPoint = document.getElementById('total-point');
const $selectDeleteBtn = document.getElementById('select-delete-btn');
const $selectBuyBtn = document.getElementById('select-buy-btn');


document.addEventListener('DOMContentLoaded', async function () {
  await drawCartList();
  await quantityBtn();
  await updateProductTotalPoint();
  await updateTotalPoint();
  await checkboxUpdate();
});

async function drawCartList() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('http://localhost:3000/cart', {
      withCredentials: true,
    });

    const carts = response.data.data.data;

    let count = 0;
    if (carts.length >= 1) {
      $cartList.innerHTML = '';
      carts.forEach(cart => {
        count++;
        let tempHtml =
          `
          <tr id="${cart.id}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white font-['Inter']">
              <div class="w-full flex mb-5">
                <div class="flex items-center h-5">
                  <input id="item-${cart.id}" type="checkbox" value="" checkbox class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" title="전체선택" />
                </div>
              </div>
            </th>
            <td class="px-6 py-4 font-['Inter'] flex items-center justify-center">
              <img src="/sourse/image/sample.png" class="aspect-square object-contain object-center w-32 overflow-hidden" />
              <div class="w-full ml-5">${cart.productName}</div>
            </td>
            <td class="px-6 py-4 font-['Inter'] text-center">
              <form class="max-w-xs mx-auto">
                <div class="relative flex items-center justify-center">
                  <button type="button" quantity-decrement="quantity" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="quantity" quantity class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="${cart.quantity}" required />
                  <button type="button" quantity-increment="quantity" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </form>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div id="point-${cart.id}" point class=" text-right ml-5 text-2xl">${cart.productPoint.toLocaleString('ko-KR')}</div>
              </div>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div product-total-point class="text-right ml-5 text-2xl">${(cart.quantity * cart.productPoint).toLocaleString('ko-KR')}</div>
              </div>
            </td>
          </tr>
          `;

        $cartList.insertAdjacentHTML("beforeend", tempHtml);
      });


    }
    if (carts.length === 0) {
      let tempHtml = '<div>장바구니 내역이 존재하지 않습니다</div>';
      $cartList.insertAdjacentHTML("beforeend", tempHtml);
    }
  } catch (err) {
    console.log('err: ', err);
    // alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}


// 전체 선택
document.getElementById('all').addEventListener('click', function () {
  const allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  allCheckboxes.forEach(checkbox => {
    checkbox.checked = this.checked;
  });
});

// 개별 선택
function updateAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
  document.getElementById('all').checked = allChecked;
}

// 개별 선택
async function checkboxUpdate() {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  $allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', async function (e) {
      updateAllCheckbox(); // 전체 선택 체크박스 상태 업데이트
    });
  });
}

// 선택 상품 삭제
$selectDeleteBtn.addEventListener('click', async function (e) {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]:checked');

  try {
    $allCheckboxes.forEach(async (checkbox) => {
      const currentRow = checkbox.closest('tr'); // 가장 가까운 태그 조회
      const cartId = currentRow.id;

      // 장바구니 삭제 API;
      try {
        const response = await axios.delete(`http://localhost:3000/cart/${cartId}`, {
          withCredentials: true,
        });

        currentRow.remove(); // 삭제한 상품 html 제거
      } catch (err) {
        alert(response.data.message);
      };
    });
    alert('선택 상품 삭제가 완료되었습니다');
  } catch (err) {
    console.log(err);
  }
});



// 선택 상품 구매
// 여기 토스 결제 페이지랑 연동도 해야함
$selectBuyBtn.addEventListener('click', async function (e) {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]:checked');

  try {
    $allCheckboxes.forEach(async (checkbox) => {
      const currentRow = checkbox.closest('tr'); // 가장 가까운 태그 조회
      const cartId = currentRow.id;

      try {
        // 장바구니에서 삭제 후 주문 내역에 추가
        // 장바구니 삭제 API
        await axios.delete(`http://localhost:3000/cart/${cartId}`, {
          withCredentials: true,
        });

        // 주문 내역 저장 API
        const response = await axios.post(`http://localhost:3000/order`, {
          product_id: 8,
          quantity: 4,
          receiver: "배고파",
          receiver_phone_number: "010-1111-1111",
          delivery_name: "집",
          delivery_address: "서울시 강남구",
          post_code: "03045"
        }, {
          withCredentials: true,
        });

        currentRow.remove(); // 삭제한 상품 html 제거
      } catch (err) {
        alert(response.data.message);
      };
    });
    alert('선택 상품 주문이 완료되었습니다');

  } catch (err) {
    console.log(err);
  }
});
// 전체 상품 구매

// 수량 증가 버튼 함수
async function quantityBtn() {
  document.querySelectorAll('[quantity-decrement="quantity"]').forEach(button => {
    button.addEventListener('click', function () {
      const currentRow = this.closest('tr'); // 가장 가까운 태그 조회
      const quantity = currentRow.querySelector('[quantity]');
      const currentValue = Number(quantity.value);

      if (currentValue > 1) {
        quantity.value = currentValue - 1;
        quantity.dispatchEvent(new Event('change')); // 상품 합계 가격 수정 함수 호출
      }
    });
  });

  document.querySelectorAll('[quantity-increment="quantity"]').forEach(button => {
    button.addEventListener('click', function () {
      const currentRow = this.closest('tr'); // 가장 가까운 태그 조회
      const quantity = currentRow.querySelector('[quantity]');
      const currentValue = Number(quantity.value);

      quantity.value = currentValue + 1;
      quantity.dispatchEvent(new Event('change')); // 상품 합계 가격 수정 함수 호출

    });
  });
}

// 상품 합계 가격 수정
async function updateProductTotalPoint() {
  document.querySelectorAll('[quantity]').forEach(input => {
    input.addEventListener('change', function () {
      const currentRow = this.closest('tr'); // 가장 가까운 태그 조회

      const quantity = Number(currentRow.querySelector('[quantity]').value);
      const point = Number(currentRow.querySelector('[point]').textContent.replace(/,/g, '')); // 가격에서 쉼표 제외
      const totalPointElement = currentRow.querySelector('[product-total-point]');

      totalPointElement.textContent = (quantity * point).toLocaleString('ko-KR');
      updateTotalPoint();
    });
  });
}

// 총 결제 금액 수정
async function updateTotalPoint() {
  let totalPoint = 0;
  document.querySelectorAll('[product-total-point]').forEach(element => {
    const value = Number(element.textContent.replace(/,/g, '')); // 가격에서 쉼표 제외
    totalPoint += value;
  });

  $totalPoint.textContent = totalPoint.toLocaleString('ko-KR');
}
