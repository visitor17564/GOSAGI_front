export const addCartButton = document.getElementById('add-cart-button');
export const purchaseButton = document.getElementById('purchase-button');
export const addressSearchBtn = document.getElementById('address-search-btn');
export const paymentBtn = document.getElementById('payment-btn');
export const chooseAddress = document.getElementById('choose-address');
export const tossModal = document.getElementById('toss-modal');
export const cartModalReceiver = document.getElementById('modal-receiver');
export const cartModalPhonenumber = document.getElementById('modal-phone-number');
export const productTotalPrice = document.getElementById('product-total-price');

export const postcode = document.getElementById('postcode');
export const address = document.getElementById('address');
export const addressDetail = document.getElementById('address-detail');

// 장바구니에 추가하기
export async function createCart(userId, productId) {
  if (userId) {
    const quantity = document.getElementById('quantity').value;
    try {
      const responseCart = await axios.post(
        `https://back.gosagi.com/cart`,
        {
          product_id: productId,
          quantity: +quantity,
        },
        {
          withCredentials: true,
        },
      );
      alert(responseCart.data.message);
      window.location.href = '/html/mypage/cart.html';
    } catch (err) {
      console.log(err);
      alert(responseCart.data.message);
    }
  } else {
    alert('로그인 후 이용 가능합니다.');
  }
}

// 주문 내역 조회(결제 전)
export async function drawCart(userId) {
  if (userId) {
    const productName = document.getElementById('product-name');

    const cartModalProductName = document.getElementById('cart-modal-product-name');
    const cartModalQuantity = document.getElementById('cart-modal-quantity');
    const cartModalTotalPrice = document.getElementById('cart-modal-total-price');
    const quantity = document.getElementById('quantity');

    cartModalProductName.value = productName.innerText;
    cartModalQuantity.value = quantity.value;
    cartModalTotalPrice.value = productTotalPrice.innerText;
  } else {
    alert('로그인 후 이용 가능합니다.');
    location.reload();
  }
}

// 주소 검색
addressSearchBtn.addEventListener('click', () => {
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

export async function paymentToss(productId) {
  if (cartModalReceiver.value && cartModalPhonenumber.value && postcode.value && address.value) {
    tossModal.classList.remove('hidden');
    toss(productId);
  } else {
    alert('수령인, 연락처, 주소를 입력해주세요');
  }
}

// 토스 결제 API
export async function toss(productId) {
  const productName = document.getElementById('product-name');

  // 토스 결제 ㅠㅠ
  // const $nicknameFix = document.getElementById('id-fix');
  const clientKey = 'test_ck_d46qopOB89xOpm5zBqZYrZmM75y0';
  const customerKey = '12345678'; // 고객 ID
  const button = document.getElementById('payment-request-button');
  const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
  // ------  결제위젯 초기화 ------
  // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
  const paymentWidget = PaymentWidget(clientKey, customerKey); // 회원 결제
  // ------  결제위젯 렌더링 ------
  paymentWidget.renderPaymentMethods('#payment-method', { value: productTotalPrice.innerText.replace(/,/g, '') }); // 금액
  // ------  이용약관 렌더링 ------
  paymentWidget.renderAgreement('#agreement');

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  button.addEventListener('click', async function () {
    try {
      await paymentWidget.requestPayment({
        orderId: generateRandomString(),
        orderName: productName.innerText, // 주문명
      });
      paymentProduct(productId); // 주문 목록에 저장
      tossModal.classList.add('hidden');
    } catch (err) {
      if (err === 'Error: 사용자가 결제를 취소하였습니다') {
        alert('결제가 취소되었습니다.');
      } else {
        console.log(err);
        alert('결제 오류가 발생하였습니다.');
      }
    }
  });
}

// 주문 내역 저장 함수
export async function paymentProduct(productId) {
  const deliveryRequest = document.getElementById('delivery-request');
  try {
    // 주문 내역 저장 API
    const response = await axios.post(
      `https://back.gosagi.com/order`,
      {
        product_id: productId,
        status: '결제완료',
        quantity: quantity.value,
        receiver: cartModalReceiver.value,
        receiver_phone_number: cartModalPhonenumber.value,
        post_code: postcode.value,
        delivery_name: '집',
        delivery_address: address.value,
        delivery_request: deliveryRequest.value,
      },
      {
        withCredentials: true,
      },
    );

    window.location.href = '/html/mypage/order.html';
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
}

chooseAddress.addEventListener('click', function () {
  window.open('/html/util/address-modal.html', '_blank', 'width=1500,height=500');
});
