const $orderList = document.getElementById('order-list');
const $paymentFinCnt = document.getElementById('payment-fin-cnt');
const $paymentCancelCnt = document.getElementById('payment-cancel-cnt');
const $shippingCnt = document.getElementById('shipping-cnt');
const $deliveryFinCnt = document.getElementById('delivery-fin-cnt');
const $periodBtns = document.querySelectorAll('[period-btn ]');
let storeId;

// 주문 목록 그리기
document.addEventListener('DOMContentLoaded', async function () {
  await getStoreId();
  await initalize(storeId);
  await getPeriodOrderList();
  // 주문 상태 변경
  await editOrderBtnClick();
  await refundCompletedBtnClick();
  await returnRequestBtnClick();
  await exchangeRequestBtnClick();
  // await purchaseConfirmBtnClick();
});

async function initalize(storeId) {
  await getAllOrderList(storeId);
}

async function drawOrderList(response) {
  try {
    const orders = response.data.data.data;

    let btnHtml;
    let paymentFinCnt = 0;
    let paymentCancelCnt = 0;
    let shippingCnt = 0;
    let deliveryFinCnt = 0;

    if (orders.length >= 1) {
      $orderList.innerHTML = '';
      orders.forEach((order) => {
        // 버튼이 2개일 때
        // 배송 전(주문 취소/수정 가능)
        let firstBtnText = '';
        let firstBtnType = '';
        let secondBtnText = '';
        let secondBtnType = '';
        let thirdBtnText = '';
        let thirdBtnType = '';

        if (order.status == 0) {
          // 주문 수정 === 배송지 수정
          paymentFinCnt++, (firstBtnText = '주문수정'), (firstBtnType = 'edit-order-btn'), (secondBtnText = '주문취소'), (secondBtnType = 'refund-completed-btn');
          btnHtml = `
            <button  ${firstBtnType} data-modal-target="order-edit-modal" data-modal-toggle="order-edit-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${firstBtnText}</button> 
            <button ${secondBtnType} data-modal-target="order-edit-modal" data-modal-toggle="order-edit-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${secondBtnText}</button>
          `;
        }
        if (order.status == 2) {
          deliveryFinCnt++, (firstBtnText = '반품신청'), (firstBtnType = 'return-request-btn'), (secondBtnText = '교환신청'), (secondBtnType = 'exchange-request-btn'), (thirdBtnText = '구매확정'), (thirdBtnType = 'purchase-confirm-btn');
          btnHtml = `
            <button ${firstBtnType} data-modal-target="order-edit-modal" data-modal-toggle="order-edit-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${firstBtnText}</button> 
            <button ${secondBtnType}  data-modal-target="order-edit-modal" data-modal-toggle="order-edit-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${secondBtnText}</button>
            <button ${thirdBtnType} data-modal-target="order-edit-modal" data-modal-toggle="order-edit-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${thirdBtnText}</button>
            `;
        }
        if (order.status != 0 && order.status != 2) {
          if (order.status == 1) {
            shippingCnt++, (firstBtnText = '배송중');
          }
          if (order.status == 3) {
            (firstBtnText = '구매확정'), deliveryFinCnt++;
          }
          if (order.status == 4) {
            (firstBtnText = '주문취소'), paymentCancelCnt++;
          }
          if (order.status == 5) {
            (firstBtnText = '반품신청'), deliveryFinCnt++;
          }
          if (order.status == 6) {
            (firstBtnText = '반품완료'), deliveryFinCnt++;
          }
          if (order.status == 7) {
            (firstBtnText = '교환신청'), deliveryFinCnt++;
          }
          btnHtml = `<button class="h-5 w-1/2 justify-center border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">${firstBtnText}</button>`;
        }

        let tempHtml = `
          <tr id="${order.id}" class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
            ${order.createdAt.slice(0, 10)}
            </th>
            <td class="px-6 py-4 font-['Inter'] flex items-center justify-center">
                <img src="${order.product_thumbnail}"
                class="aspect-square object-contain object-center w-32 overflow-hidden" alt=""
                />
                <div product-name class="w-full ml-5">${order.product_name}</div>
            </td>
            <td class="px-6 py-4 font-['Inter'] text-center">
              <form class="max-w-xs mx-auto">
                <div quantity class="relative flex items-center justify-center">${order.quantity}</div>
              </form>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div product-total-price class="text-right ml-5 text-2xl">${(order.product_price * order.quantity).toLocaleString('ko-KR')}</div>
              </div>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              ${btnHtml}
            </td>
          </tr>
          `;

        $orderList.insertAdjacentHTML('beforeend', tempHtml);
      });

      $paymentFinCnt.innerText = paymentFinCnt;
      $paymentCancelCnt.innerText = paymentCancelCnt;
      $shippingCnt.innerText = shippingCnt;
      $deliveryFinCnt.innerText = deliveryFinCnt;
    }
    if (orders.length === 0) {
      let tempHtml = '<div>주문 내역이 존재하지 않습니다</div>';
      $orderList.innerHTML = tempHtml;
      $paymentFinCnt.innerText = 0;
      $paymentCancelCnt.innerText = 0;
      $shippingCnt.innerText = 0;
      $deliveryFinCnt.innerText = 0;
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

// 전체 조회
async function getAllOrderList(storeId) {
  // 주문 목록 전체 조회 API 실행
  const response = await axios.get(`https://back.gosagi.com/order/store/${storeId}`, {
    withCredentials: true,
  });

  await drawOrderList(response);
}

// 기간 조회
async function getPeriodOrderList() {
  $periodBtns.forEach((button) => {
    button.addEventListener('click', async () => {
      const $startDate = document.getElementById('start-date');
      const $endDate = document.getElementById('end-date');

      let periodType = button.id;
      if (periodType === 'select') {
        const start = new Date($startDate.value);
        const end = new Date($endDate.value);

        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        const totalDays = Math.ceil(differenceInDays) + 1;
        periodType = `${totalDays}days`;
      }
      // 주문 목록 기간 조회 API 실행
      const response = await axios.get(`https://back.gosagi.com/order/?period=${periodType}`, {
        withCredentials: true,
      });

      drawOrderList(response);
    });
  });
}

// 주문 내역 상세 조회(결제 전)
async function drawCart(orderId) {
  // 주문 상세 내역 조회
  try {
    // 문의 글 상세 조회 API 실행
    const response = await axios.get(`https://back.gosagi.com/order/${orderId}`, {
      withCredentials: true,
    });

    const order = response.data.data;
    // 상품 정보
    document.getElementById('order-modal-product-name').value = order.product_name;
    document.getElementById('order-modal-quantity').value = order.quantity;
    document.getElementById('order-modal-total-price').value = order.quantity * order.product_price;

    // 배송 정보
    document.getElementById('modal-receiver').value = order.receiver;
    document.getElementById('modal-phone-number').value = order.receiver_phone_number;
    document.getElementById('postcode').value = order.post_code;
    document.getElementById('address').value = order.delivery_address;
    document.getElementById('address-detail').value = order.delivery_address_detail;
    document.getElementById('delivery-request').value = order.delivery_request;

    return order.product_id; // 교환을 위해 productId 반환
  } catch (err) {
    console.log(err);
  }
}

// 주문 수정 버튼 클릭 이벤트
async function editOrderBtnClick() {
  const $editOrderBtns = document.querySelectorAll('[edit-order-btn]');
  $editOrderBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const orderId = currentRow.id;

      // 버튼 변경
      document.getElementById('order-modal-btn').innerHTML = `<button type="button" id="order-modal-order-edit-btn" class="w-full justify-center text-white text-center text-xl bg-orange-400 items-center py-6 rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">수정하기</button>`;

      drawCart(orderId);
      activateDelivertInfo();
      await editOrderData(orderId);
    });
  });
}

// 주문(배송지) 수정
async function editOrderData(orderId) {
  document.getElementById('order-modal-order-edit-btn').addEventListener('click', async () => {
    try {
      // 배송지 수정 API 실행
      const response = await axios.patch(
        `https://back.gosagi.com/order/address/${orderId}`,
        {
          receiver: document.getElementById('modal-receiver').value,
          receiver_phone_number: document.getElementById('modal-phone-number').value,
          delivery_address: document.getElementById('address').value,
          delivery_address_detail: document.getElementById('address-detail').value,
          post_code: document.getElementById('postcode').value,
          delivery_request: document.getElementById('delivery-request').value,
        },
        {
          withCredentials: true,
        },
      );

      alert(response.data.message);
    } catch (err) {
      console.log('err: ', err);
      alert(err.response.data.message);
    }
  });
}

// 주문 취소 버튼 클릭 아벤트
async function refundCompletedBtnClick() {
  const $refundCompletedBtns = document.querySelectorAll('[refund-completed-btn]');
  $refundCompletedBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const orderId = currentRow.id;

      // 버튼 변경
      document.getElementById('order-modal-btn').innerHTML = `<button type="button" id="order-modal-order-cancle-btn" class="w-full justify-center text-white text-center text-xl bg-orange-400 items-center py-6 rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">취소하기</button>`;

      drawCart(orderId);
      disabledDeliveryInfo();
      refundCompleted(orderId);
    });
  });
}

// 주문 취소
async function refundCompleted(orderId) {
  document.getElementById('order-modal-order-cancle-btn').addEventListener('click', async () => {
    if (confirm('주문을 취소하시겠습니까?')) {
      try {
        // 배송지 수정 API 실행
        const response = await axios.patch(
          `https://back.gosagi.com/order/refund/${orderId}`,
          {
            status: 4,
          },
          {
            withCredentials: true,
          },
        );

        alert(response.data.message);
        location.reload();

        // toss 환불 기능 추가 필요
      } catch (err) {
        console.log('err: ', err);
        alert(err.response.data.message);
      }
    }
  });
}

// 반품 신청 버튼 클릭 이벤트
async function returnRequestBtnClick() {
  const $returnRequestBtns = document.querySelectorAll('[return-request-btn]');
  $returnRequestBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const orderId = currentRow.id;

      // 버튼 변경
      document.getElementById('order-modal-btn').innerHTML = `<button type="button" id="order-modal-order-return-btn" class="w-full justify-center text-white text-center text-xl bg-orange-400 items-center py-6 rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">반품 신청하기</button>`;

      drawCart(orderId);
      activateDelivertInfo();
      returnRequest(orderId);
    });
  });
}

// 반품 신청
async function returnRequest(orderId) {
  document.getElementById('order-modal-order-return-btn').addEventListener('click', async () => {
    if (confirm('반품을 신청하시겠습니까?')) {
      try {
        // 배송지 수정 API 실행
        const response = await axios.patch(
          `https://back.gosagi.com/order/return/${orderId}`,
          {
            status: 5,
            // toss_order_id: aagsfbbs,
            receiver: document.getElementById('modal-receiver').value,
            receiver_phone_number: document.getElementById('modal-phone-number').value,
            delivery_address: document.getElementById('address').value,
            delivery_address_detail: document.getElementById('address-detail').value,
            post_code: document.getElementById('postcode').value,
            delivery_request: document.getElementById('delivery-request').value,
            // after_service_request: 아묻따 반품!!!
          },
          {
            withCredentials: true,
          },
        );

        alert(response.data.message);
        location.reload();

        // toss 환불 기능 추가 필요
      } catch (err) {
        console.log('err: ', err);
        alert(err.response.data.message);
      }
    }
  });
}

// 교환 신청 버튼 클릭 이벤트
async function exchangeRequestBtnClick() {
  const $exchangeRequestBtns = document.querySelectorAll('[exchange-request-btn]');
  $exchangeRequestBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const orderId = currentRow.id;

      // 버튼 변경
      document.getElementById('order-modal-btn').innerHTML = `<button type="button" id="order-modal-order-exchange-btn" class="w-full justify-center text-white text-center text-xl bg-orange-400 items-center py-6 rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">교환 신청하기</button>`;

      const productId = await drawCart(orderId);
      await activateDelivertInfo();
      await exchangeRequest(orderId, productId);
    });
  });
}

async function exchangeRequest(orderId, productId) {
  document.getElementById('order-modal-order-exchange-btn').addEventListener('click', async () => {
    if (confirm('새 상품으로 교환을 신청하시겠습니까?')) {
      try {
        // 배송지 수정 API 실행
        const response = await axios.post(
          `https://back.gosagi.com/order/exchange/${orderId}`,
          {
            status: 7,
            product_id: productId, // prodcut_id 반환해주는 기능이 필요함
            quantity: document.getElementById('order-modal-quantity').value,
            toss_order_id: 'test',
            receiver: document.getElementById('modal-receiver').value,
            receiver_phone_number: document.getElementById('modal-phone-number').value,
            delivery_address: document.getElementById('address').value,
            delivery_address_detail: document.getElementById('address-detail').value,
            post_code: document.getElementById('postcode').value,
            delivery_request: document.getElementById('delivery-request').value,
            after_service_request: 'test',
          },
          {
            withCredentials: true,
          },
        );

        alert(response.data.message);
        location.reload();

        // toss 환불 기능 추가 필요
      } catch (err) {
        console.log('err: ', err);
        alert(err.response.data.message);
      }
    }
  });
}

// 구매 확정
async function purchaseConfirm() {
  const $purchaseConfirmBtns = document.querySelectorAll('[purchase-confirm-btn]');
  $purchaseConfirmBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const orderId = currentRow.id;

      if (confirm('구매를 확정하시겠습니까?')) {
        try {
          // 구매 확정 API 실행
          const response = await axios.patch(
            `https://back.gosagi.com/order/confirm/${orderId}`,
            {
              status: 3,
            },
            {
              withCredentials: true,
            },
          );

          alert(response.data.message);
          location.reload();
        } catch (err) {
          alert(err.response.data.message);
        }
      }
    });
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

// 배송 정보 input 비활성화
async function disabledDeliveryInfo() {
  // 배송 정보
  document.getElementById('modal-receiver').disabled = true;
  document.getElementById('modal-phone-number').disabled = true;
  document.getElementById('address-detail').disabled = true;
  document.getElementById('delivery-request').disabled = true;

  // 버튼
  document.getElementById('address-search-btn').classList.add('hidden');
  document.getElementById('address-direct-btn').classList.add('hidden');
  document.getElementById('address-select-btn').classList.add('hidden');
}

// 배송 정보 input 활성화
async function activateDelivertInfo() {
  // 배송 정보
  document.getElementById('modal-receiver').disabled = false;
  document.getElementById('modal-phone-number').disabled = false;
  document.getElementById('address-detail').disabled = false;
  document.getElementById('delivery-request').disabled = false;

  // 버튼
  document.getElementById('address-search-btn').classList.remove('hidden');
  document.getElementById('address-direct-btn').classList.remove('hidden');
  document.getElementById('address-select-btn').classList.remove('hidden');
}

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
