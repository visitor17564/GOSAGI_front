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
});

async function initalize(storeId) {
  await getAllOrderList(storeId);
}

// 버튼 클릭 이벤트
document.addEventListener('click', async (event) => {
  const clickedElement = String(event.target.id);
  const clickedElementIdArray = clickedElement.split('-');
  const clickedElementId = clickedElementIdArray[clickedElementIdArray.length - 1];

  // 주문 내역 상세 조회
  if (clickedElement.includes('order-detail-btn')) {
    getOrderDetail(clickedElementId); // 주문 내역 상세 조회
  }

  // 배송 상태 변경(결제완료 -> 배달중)
  if (clickedElement.includes('shipping-btn') || clickedElement.includes('delivery-completed-btn') || clickedElement.includes('return-completed-btn')) {
    changeOrderStatus(clickedElementId, clickedElement); // 배송 상태 변경
  }
});

async function drawOrderList(response) {
  try {
    const orders = response.data.data.data;

    let btnHtml;
    let statusHtml;
    let paymentFinCnt = 0;
    let paymentCancelCnt = 0;
    let shippingCnt = 0;
    let deliveryFinCnt = 0;

    if (orders.length >= 1) {
      $orderList.innerHTML = ''; // 주문 목록 초기화

      orders.forEach((order) => {
        let statusText = '';
        let secondBtnText = '';
        let secondBtnType = '';
        let thirdBtnText = '';
        let thirdBtnType = '';

        // 결제 완료일 때
        // 배달중으로 변경할 수 있도록 해야함
        if (order.status == 0) {
          paymentFinCnt++, (statusText = '결제완료'), (secondBtnText = '배송시작'), (secondBtnType = `shipping-btn-${order.id}`);
        }
        // 배달중일 때
        // 배달 완료로 변경할 수 있도록 해야함
        if (order.status == 1) {
          deliveryFinCnt++, (statusText = '배송중'), (secondBtnText = '배송완료'), (secondBtnType = `delivery-completed-btn-${order.id}`);
        }
        // 배달 완료되었을 때
        if (order.status == 2) {
          shippingCnt++, (statusText = '배송완료');
        }
        // 구매 확정이 되었을 때 = 지금은 구매 확정을 하려면 리뷰를 작성해야함(24.02.13)
        // 리뷰가 있다면 볼 수 있게 해야함
        if (order.status == 3) {
          deliveryFinCnt++, (statusText = '구매확정');
          // , (secondBtnText = '리뷰 조회'), (secondBtnType = 'review-detail-btn');
        }
        // 취소 사유 볼 수 있게 해야함
        if (order.status == 4) {
          paymentCancelCnt++, (statusText = '주문취소');
          // ,(secondBtnText = '취소사유 조회'), (secondBtnType = '4');
        }
        // 반품 사유 볼 수 있게 해야함
        if (order.status == 5) {
          deliveryFinCnt++,
            (statusText = '반품신청'),
            // (secondBtnText = '반품사유 조회'), (secondBtnType = '5'),
            (thirdBtnText = '반품완료'),
            (thirdBtnType = `return-completed-btn-${order.id}`);
        }
        // 반품 사유 볼 수 있게 해야함
        if (order.status == 6) {
          deliveryFinCnt++, (statusText = '반품완료');
          // , (secondBtnText = '반품사유 조회'), (secondBtnType = '5');
        }
        // 교환 사유 볼 수 있게 해야함
        if (order.status == 7) {
          deliveryFinCnt++, (statusText = '교환신청');
          // , (secondBtnText = '교환사유 조회'), (secondBtnType = '7');
        }

        // 현재 상태
        statusHtml = `<button class="h-5 w-1/2 justify-center border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">${statusText}</button>`;

        // 관리 버튼
        btnHtml = `<button id="order-detail-btn-${order.id}" order-detail-modal data-modal-target="order-detail-modal" data-modal-toggle="order-detail-modal" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">주문내역 조회</button> `;
        if (secondBtnText) {
          btnHtml += `<button id="${secondBtnType}" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${secondBtnText}</button> `;
        }
        if (thirdBtnText) {
          btnHtml += `<button id="${thirdBtnType}" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${thirdBtnText}</button> `;
        }

        let tempHtml = `
          <tr id="${order.id}" class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
            ${order.created_at.slice(0, 10)}
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
              ${statusHtml}
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              ${btnHtml}
            </td>
          </tr>
          `;

        $orderList.insertAdjacentHTML('beforeend', tempHtml);
      });

      // 상태별 수 조회
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

  await drawOrderList(response); // 주문 내역 목록 뿌리기
}

// 배송 상태 변경

async function changeOrderStatus(orderId, clickedElement) {
  let confirmMsg = '';
  let deliveryStatus = 0;

  // 알림 메시지, 배송 상태 설정
  if (clickedElement.includes('shipping-btn')) {
    confirmMsg = '배송중으로 변경하시겠습니까?';
    deliveryStatus = 1;
  } else if (clickedElement.includes('delivery-completed-btn')) {
    confirmMsg = '배송완료로 변경하시겠습니까?';
    deliveryStatus = 2;
  } else if (clickedElement.includes('return-completed-btn')) {
    confirmMsg = '반품 완료로 변경하시겠습니까?';
    deliveryStatus = 6;
  }

  if (confirm(confirmMsg)) {
    // 배달 상태 변경
    if (deliveryStatus === 1 || deliveryStatus === 2) {
      try {
        // 배송 상태 변경 API 실행
        const response = await axios.patch(
          `https://back.gosagi.com/order/manage/${orderId}`,
          {
            status: deliveryStatus,
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

    // 반품 상태 변경
    if (deliveryStatus === 6) {
      try {
        // 반품 상태 변경 API 실행
        const response = await axios.patch(
          `https://back.gosagi.com/order/manage/return/${orderId}`,
          {
            status: deliveryStatus,
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
  }
}

// 주문 내역 상세 조회
async function getOrderDetail(orderId) {
  try {
    // 주문내역 상세 조회 API 실행
    const response = await axios.get(`https://back.gosagi.com/order/${orderId}`, {
      withCredentials: true,
    });
    const order = response.data.data;

    drawOrderDetail(order); // 주문 내역 뿌리기
  } catch (err) {
    alert(err.response.data.message);
  }
}

// 주문 내역 상세 뿌리기
async function drawOrderDetail(order) {
  try {
    // 상품 정보
    document.getElementById('order-modal-product-name').value = order.product_name;
    document.getElementById('order-modal-quantity').value = order.quantity;
    document.getElementById('order-modal-total-price').value = (order.quantity * order.product_price).toLocaleString('ko-KR');

    // 배송 정보
    document.getElementById('modal-receiver').value = order.receiver;
    document.getElementById('modal-phone-number').value = order.receiver_phone_number;
    document.getElementById('postcode').value = order.post_code;
    document.getElementById('address').value = order.delivery_address;
    document.getElementById('address-detail').value = order.delivery_address_detail;
    document.getElementById('delivery-request').value = order.delivery_request;
  } catch (err) {
    console.log(err);
  }
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
