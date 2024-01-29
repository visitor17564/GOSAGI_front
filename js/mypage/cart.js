// DOM 요소들
const $cartList = document.getElementById('cart-list');
const $totalPrice = document.getElementById('total-price');
const $selectDeleteBtn = document.getElementById('select-delete-btn');
const $selectBuyBtn = document.getElementById('select-payment-btn');
const $allBuyBtn = document.getElementById('all-payment-btn');

const $paymentBtn = document.getElementById('payment-btn');
const $allSelectCheckbox = document.getElementById('all-select-checkbox');

const $cartModalOrderListBottom = document.getElementById('cart-modal-order-list-bottom');
const $cartModalTotalPrice = document.getElementById('cart-modal-total-price');

document.addEventListener('DOMContentLoaded', async function () {
  await drawCartList();
  await quantityBtn();
  await updateProductTotalPrice();
  await updateTotalPrice();
  await checkboxUpdate();
});

// 장바구니 목록 조회
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
      carts.forEach((cart) => {
        count++;
        let tempHtml = `
          <tr id="${cart.id}" class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
              <div class="w-full flex mb-5">
                <div class="flex items-center h-5">
                  <input id="item-${cart.id}" type="checkbox" value="" checkbox class="w-4 h-4 border border-gray-300 rounded bg-gray-50 " title="전체선택" />
                </div>
              </div>
            </th>
            <td class="px-6 py-4 font-['Inter'] flex items-center justify-center">
              <img src="${cart.productThumbnail}" class="aspect-square object-contain object-center w-32 overflow-hidden" />
              <div product-name class="w-full ml-5">${cart.productName}</div>
            </td>
            <td class="px-6 py-4 font-['Inter'] text-center">
              <form class="max-w-xs mx-auto">
                <div class="relative flex items-center justify-center">
                  <button type="button" quantity-decrement="quantity" class="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="quantity" quantity class="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="${cart.quantity}" required />
                  <button type="button" quantity-increment="quantity" class="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </form>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div id="price-${cart.id}" price class=" text-right ml-5 text-2xl">${cart.productPrice.toLocaleString('ko-KR')}</div>
              </div>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div product-total-price class="text-right ml-5 text-2xl">${(cart.quantity * cart.productPrice).toLocaleString('ko-KR')}</div>
              </div>
            </td>
          </tr>
          `;

        $cartList.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (carts.length === 0) {
      let tempHtml = '<div>장바구니 내역이 존재하지 않습니다</div>';
      $cartList.insertAdjacentHTML('beforeend', tempHtml);
    }
  } catch (err) {
    console.log('err: ', err);
    // alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}

// 선택 상품 구매
// 여기 토스 결제 페이지랑 연동도 해야함
$selectBuyBtn.addEventListener('click', async function (e) {
  drawSelectCart();
});

// 전체 상품 구매
$allBuyBtn.addEventListener('click', async function (e) {
  $allSelectCheckbox.checked = true; // 상품 합계 가격 수정 함수 호출
  selectAllCheckbox();
  drawSelectCart();
});

// 선택 장바구니 목록 조회
async function drawSelectCart() {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]:checked');
  if ($allCheckboxes.length === 0) {
    alert('선택된 상품이 없습니다.');
    location.reload();
    return;
  }
  const $orderSelectInfo = document.querySelectorAll('[order-select-info]');
  $orderSelectInfo.forEach((element) => {
    element.remove();
  });

  try {
    $allCheckboxes.forEach(async (checkbox) => {
      const currentRow = checkbox.closest('tr'); // 가장 가까운 태그 조회
      const cartId = currentRow.id;
      const productName = currentRow.querySelector('[product-name]').innerHTML;
      const quantity = currentRow.querySelector('[quantity]').value;
      const productTotalPrice = currentRow.querySelector('[product-total-price]').innerHTML;

      let tempHtml = `
        <div order-select-info class="mb-5 w-full">
          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">상품명</label>
          <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${productName}" disabled />
        </div>
        <div order-select-info class="mb-5 w-full">
          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">가격</label>
          <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${productTotalPrice}" disabled />
        </div>
        <div order-select-info class="mb-5 w-full">
          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">수량</label>
          <input type="text" id="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${quantity}" disabled />
        </div>
      `;

      $cartModalOrderListBottom.insertAdjacentHTML('beforebegin', tempHtml);
      $cartModalTotalPrice.value = $totalPrice.textContent;
    });
  } catch (err) {
    console.log(err);
  }
}

// 상품 구매
$paymentBtn.addEventListener('click', function (e) {
  toss();
});

// 전체 선택
$allSelectCheckbox.addEventListener('click', function () {
  selectAllCheckbox();
});

async function selectAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = $allSelectCheckbox.checked;
  });
  updateTotalPrice();
}

// 개별 선택
function updateAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  const allChecked = Array.from(allCheckboxes).every((checkbox) => checkbox.checked);
  $allSelectCheckbox.checked = allChecked;
  updateTotalPrice();
}

// 개별 선택
async function checkboxUpdate() {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]');
  $allCheckboxes.forEach((checkbox) => {
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
      }
    });
    alert('선택 상품 삭제가 완료되었습니다');
  } catch (err) {
    console.log(err);
  }
});

// 상품 구매 함수
async function paymentProduct() {
  // try {
  //   // 장바구니에서 삭제 후 주문 내역에 추가
  //   // 장바구니 삭제 API
  //   await axios.delete(`http://localhost:3000/cart/${cartId}`, {
  //     withCredentials: true,
  //   });
  //   // 주문 내역 저장 API
  //   const response = await axios.post(`http://localhost:3000/order`, {
  //     product_id: 8,
  //     quantity: 4,
  //     receiver: "배고파",
  //     receiver_phone_number: "010-1111-1111",
  //     delivery_name: "집",
  //     delivery_address: "서울시 강남구",
  //     post_code: "03045"
  //   }, {
  //     withCredentials: true,
  //   });
  //   currentRow.remove(); // 삭제한 상품 html 제거
  // } catch (err) {
  //   alert(response.data.message);
  // };
}

// 수량 증가 버튼 함수
async function quantityBtn() {
  document.querySelectorAll('[quantity-decrement="quantity"]').forEach((button) => {
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

  document.querySelectorAll('[quantity-increment="quantity"]').forEach((button) => {
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
async function updateProductTotalPrice() {
  document.querySelectorAll('[quantity]').forEach((input) => {
    input.addEventListener('change', function () {
      const currentRow = this.closest('tr'); // 가장 가까운 태그 조회

      const quantity = Number(currentRow.querySelector('[quantity]').value);
      const price = Number(currentRow.querySelector('[price]').textContent.replace(/,/g, '')); // 가격에서 쉼표 제외
      const totalPriceElement = currentRow.querySelector('[product-total-price]');

      totalPriceElement.textContent = (quantity * price).toLocaleString('ko-KR');
      updateTotalPrice();
    });
  });
}

// 총 결제 금액 수정
async function updateTotalPrice() {
  let totalPrice = 0;

  document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
    const parentRow = checkbox.closest('tr'); // 체크박스가 위치한 행 찾기
    const productPriceElement = parentRow.querySelector('[product-total-price]');

    if (productPriceElement) {
      const value = Number(productPriceElement.textContent.replace(/,/g, ''));
      totalPrice += value;
    }
  });

  $totalPrice.textContent = totalPrice.toLocaleString('ko-KR');
}

async function toss() {
  // 토스 결제 ㅠㅠ
  const $nicknameFix = document.getElementById('nickname-fix');

  const clientKey = 'test_ck_d46qopOB89xOpm5zBqZYrZmM75y0';
  const customerKey = $nicknameFix.textContent; // 고객 ID

  const button = document.getElementById('payment-request-button');
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
  // ------  결제위젯 초기화 ------
  // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
  const paymentWidget = PaymentWidget(clientKey, customerKey); // 회원 결제
  // ------  결제위젯 렌더링 ------
  paymentWidget.renderPaymentMethods('#payment-method', { value: $totalPrice.textContent }); // 금액
  // ------  이용약관 렌더링 ------
  paymentWidget.renderAgreement('#agreement');

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  button.addEventListener('click', function () {
    paymentWidget.requestPayment({
      orderId: generateRandomString(),
      orderName: '테스트 외 1건', // 주문명
      successUrl: 'http://localhost:5500/html/mypage/payment.html', // 결제에 성공하면 이동하는 페이지
      failUrl: 'http://localhost:5500/html/mypage/cart.html', // 결제에 실패하면 이동하는 페이지
      customerName: $nicknameFix.textContent,
    });
  });
}
