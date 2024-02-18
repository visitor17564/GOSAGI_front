import * as modalAPI from '../util/open-close-modal.js';

// DOM 요소들
const $cartList = document.getElementById('cart-list');
const $totalPrice = document.getElementById('total-price');
const $selectDeleteBtn = document.getElementById('select-delete-btn');
const $selectBuyBtn = document.getElementById('select-payment-btn');
const $allBuyBtn = document.getElementById('all-payment-btn');

const $allSelectCheckbox = document.getElementById('all-select-checkbox');

const $cartModalOrderListBottom = document.getElementById('cart-modal-order-list-bottom');
const $cartModalTotalPrice = document.getElementById('cart-modal-total-price');

const $cartModalReceiver = document.getElementById('modal-receiver');
const $cartModalPhonenumber = document.getElementById('modal-phone-number');

const $postcode = document.getElementById('postcode');
const $address = document.getElementById('address');
const $deliveryRequest = document.getElementById('delivery-request');

const tossModal = document.getElementById('toss-modal');

const chooseAddress = document.getElementById('choose-address');

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
    const response = await axios.get('https://back.gosagi.com/cart', {
      withCredentials: true,
    });

    const carts = response.data.data.data;

    let count = 0;
    if (carts.length >= 1) {
      $cartList.innerHTML = '';
      carts.forEach((cart) => {
        count++;
        let tempHtml = `
          <tr id="${cart.id}" class="bg-white border-b" title="${cart.product_id}">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
              <div class="w-full flex mb-5">
                <div class="flex items-center h-5">
                  <input id="item-${cart.id}" type="checkbox" value="" checkbox class="w-4 h-4 border border-gray-300 rounded bg-gray-50 " title="전체선택" />
                </div>
              </div>
            </th>
            <td>
            <a class="px-6 py-4 font-['Inter'] flex items-center justify-center" href="/html/search/detail.html?productId=${cart.product_id}">
              <img src="${cart.productThumbnail}" class="aspect-square object-contain object-center w-32 overflow-hidden" />
              <div product-name class="w-full ml-5">${cart.productName}</div>
            </a>
            </td>
            <td class="px-6 py-4 font-['Inter'] text-center">
              <form class="max-w-xs mx-auto">
                <div class="relative flex items-center justify-center">
                  <button type="button" quantity-decrement="quantity" class="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="quantity" quantity class="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="${cart.quantity}" required />
                  <button type="button" quantity-increment="quantity" class="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                    <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
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
  modalAPI.openModal('cart-modal');
  drawSelectCart();
});

// 전체 상품 구매
$allBuyBtn.addEventListener('click', async function (e) {
  modalAPI.openModal('cart-modal');
  $allSelectCheckbox.checked = true; // 상품 합계 가격 수정 함수 호출
  selectAllCheckbox();
  drawSelectCart();
});

// 선택 장바구니 목록 조회
async function drawSelectCart() {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]:checked');
  const $orderSelectInfo = document.querySelectorAll('[order-select-info]');
  $orderSelectInfo.forEach((element) => {
    element.remove();
  });
  if ($allCheckboxes.length === 0) {
    alert('선택된 상품이 없습니다.');
    location.reload();
    return;
  } else if ($allCheckboxes.length === 1) {
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
            <input cart-modal-product-name type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${productName}" disabled />
          </div>
          <div order-select-info class="mb-5 w-full">
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">가격</label>
            <input type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${productTotalPrice}" disabled />
          </div>
          <div order-select-info class="mb-5 w-full">
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">수량</label>
            <input type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${quantity}" disabled />
          </div>
        `;

        $cartModalOrderListBottom.insertAdjacentHTML('beforebegin', tempHtml);
        $cartModalTotalPrice.value = $totalPrice.textContent;
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const currentRow = $allCheckboxes[0].closest('tr'); // 가장 가까운 태그 조회
      const cartId = currentRow.id;
      const productName = currentRow.querySelector('[product-name]').innerHTML;
      const quantity = currentRow.querySelector('[quantity]').value;
      const productTotalPrice = currentRow.querySelector('[product-total-price]').innerHTML;

      let tempHtml = `
        <div order-select-info class="mb-5 w-full">
          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 font-['Inter']">상품명</label>
          <input cart-modal-product-name type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-400 block w-full p-2.5 " value="${productName} 외 ${$allCheckboxes.length - 1}" disabled />
        </div>
      `;
      $cartModalOrderListBottom.insertAdjacentHTML('beforebegin', tempHtml);
      $cartModalTotalPrice.value = $totalPrice.textContent;
    } catch (err) {
      console.log(err);
    }
  }
}

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
        const response = await axios.delete(`https://back.gosagi.com/cart/${cartId}`, {
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

// 토스 결제 버튼 클릭 이벤트
document.getElementById('payment-btn').addEventListener('click', function () {
  if ($cartModalReceiver.value && $cartModalPhonenumber.value && $postcode.value && $address.value) {
    modalAPI.openModal('toss-modal');
    toss();
  } else {
    alert('수령인, 연락처, 주소를 입력해주세요');
  }
});

// 토스 결제 API
function toss() {
  const $cartModalProductNames = document.querySelectorAll('[cart-modal-product-name]');
  const orderName = $cartModalProductNames.length === 1 ? $cartModalProductNames[0].value : `${$cartModalProductNames[1].value} 외 ${$cartModalProductNames.length - 1}`;

  // 토스 결제 ㅠㅠ
  // const $nicknameFix = document.getElementById('id-fix');
  const clientKey = 'test_ck_ma60RZblrqj46Z5PLMRM8wzYWBn1';
  const customerKey = '12345678'; // 고객 ID
  const button = document.getElementById('payment-request-button');
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
  // ------  결제위젯 초기화 ------
  // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
  const paymentWidget = PaymentWidget(clientKey, customerKey); // 회원 결제
  // ------  결제위젯 렌더링 ------
  paymentWidget.renderPaymentMethods('#payment-method', { value: $cartModalTotalPrice.value.replace(/,/g, '') }); // 금액
  // ------  이용약관 렌더링 ------
  paymentWidget.renderAgreement('#agreement');

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  button.addEventListener('click', async function () {
    try {
      await paymentWidget.requestPayment({
        orderId: generateRandomString(),
        orderName, // 주문명
      });
      paymentProduct(); // 주문 목록에 저장
    } catch (err) {
      console.log('err: ', err);
      if (err === 'Error: 사용자가 결제를 취소하였습니다') {
        alert('결제가 취소되었습니다.');
      } else {
        alert('결제 오류가 발생하였습니다.');
      }
    } finally {
      tossModal.classList.add('hidden');
    }
  });
}

// 주문 내역 저장 함수
async function paymentProduct() {
  const $allCheckboxes = document.querySelectorAll('#cart-list input[type="checkbox"]:checked');

  $allCheckboxes.forEach(async (cart) => {
    const currentRow = cart.closest('tr'); // 가장 가까운 태그 조회
    const cartId = currentRow.id;
    const productId = currentRow.title;
    const quantity = currentRow.querySelector('[quantity]');
    try {
      // 주문 내역 저장 API
      await axios.post(
        `https://back.gosagi.com/order`,
        {
          product_id: productId,
          status: 0,
          quantity: quantity.value,
          receiver: $cartModalReceiver.value,
          receiver_phone_number: $cartModalPhonenumber.value,
          post_code: $postcode.value,
          delivery_name: '집',
          delivery_address: $address.value,
          delivery_request: $deliveryRequest.value,
        },
        {
          withCredentials: true,
        },
      );

      // 장바구니 삭제 API
      await axios.delete(`https://back.gosagi.com/cart/${cartId}`, {
        withCredentials: true,
      });

      window.location.href = '/html/mypage/order.html';
    } catch (err) {
      alert(err.response.data.message);
    }
  });
}

// 주소 검색
document.getElementById('address-search-btn').addEventListener('click', () => {
  const address = document.getElementById('address');
  const addressDetail = document.getElementById('address-detail');

  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        addressDetail.value = extraAddr;
      } else {
        addressDetail.value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postcode.value = data.zonecode;
      address.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      addressDetail.focus();
    },
  }).open();
});

chooseAddress.addEventListener('click', function () {
  window.open('/html/util/address-modal.html', '_blank', 'width=1500,height=500');
});
