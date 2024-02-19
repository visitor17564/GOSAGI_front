const $orderList = document.getElementById('order-list');
const $paymentFinCnt = document.getElementById('payment-fin-cnt');
const $paymentCancelCnt = document.getElementById('payment-cancel-cnt');
const $shippingCnt = document.getElementById('shipping-cnt');
const $deliveryFinCnt = document.getElementById('delivery-fin-cnt');
const $periodBtns = document.querySelectorAll('[period-btn ]');
const $sellerEditButton = document.getElementById('seller-edit-btn');
let storeId;

// 주문 목록 그리기
document.addEventListener('DOMContentLoaded', async function () {
  await getStoreInfo();
  await initalize(storeId);
  // 주문 상태 변경
  await editOrderBtnClick();
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
      });

      $paymentFinCnt.innerText = paymentFinCnt;
      $paymentCancelCnt.innerText = paymentCancelCnt;
      $shippingCnt.innerText = shippingCnt;
      $deliveryFinCnt.innerText = deliveryFinCnt;
    }
    if (orders.length === 0) {
      $paymentFinCnt.innerText = 0;
      $paymentCancelCnt.innerText = 0;
      $shippingCnt.innerText = 0;
      $deliveryFinCnt.innerText = 0;
    }
  } catch (err) {
    alert('에러발생');
    console.log(err);
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

async function getStoreInfo() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    storeId = response.data.data[0].store[0].id;
    document.getElementById('seller-name').innerText = response.data.data[0].store[0].name;
    document.getElementById('seller-number').value = response.data.data[0].store[0].business_number;
    document.getElementById('seller-address').value = response.data.data[0].store[0].address;
    document.getElementById('seller-phone').value = response.data.data[0].store[0].phone_number;
  } catch (err) {
    // 오류 처리
    alert('판매자 등록 후 이용해 주세요');
    location.href = '/html/seller/non-signup.html';
  }
}

$sellerEditButton.addEventListener('click', async () => {});
