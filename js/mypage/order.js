const $orderList = document.getElementById('order-list');
drawOrderList();
// 주문 목록 조회
async function drawOrderList() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('http://localhost:3000/order', {
      withCredentials: true,
    });

    const orders = response.data.data.data;
    console.log(orders);

    let btnHtml;
    let purchaseFin;
    let shipping;
    let deliveryFin;
    if (orders.length >= 1) {
      $orderList.innerHTML = '';
      orders.forEach((order) => {
        // 버튼이 2개일 때
        // 배송 전(주문 취소/수정 가능)
        if (order.status == 0 || order.status == 2) {
          const firstBtnText = order.status == 0 ? '주문수정' : '반품신청';
          const secondBtnText = order.status == 0 ? '주문취소' : '교환신청';

          btnHtml = `<button class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${firstBtnText}</button> <button class="h-5 w-1/2 justify-center hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">${secondBtnText}</button>`;
        } else {
          let btnText;
          if (order.status == 1) btnText = '배송중';
          if (order.status == 3) btnText = '구매확정';
          if (order.status == 4) btnText = '주문취소';
          if (order.status == 5) btnText = '반품신청';
          if (order.status == 6) btnText = '반품완료';
          if (order.status == 7) btnText = '교환신청';
          btnHtml = `<button class="h-5 w-1/2 justify-center border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">${btnText}</button>`;
        }

        let tempHtml = `
          <tr class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
            ${order.createdAt.slice(0, 10)}
            </th>
            <td class="px-6 py-4 font-['Inter'] flex items-center justify-center">
                <img src="/sourse/image/sample.png"
                class="aspect-square object-contain object-center w-32 overflow-hidden" alt=""
                />
                <div class="w-full ml-5">${order.product_name}</div>
            </td>
            <td class="px-6 py-4 font-['Inter'] text-center">
              <form class="max-w-xs mx-auto">
                <div class="relative flex items-center justify-center">
                ${order.quantity}
                </div>
              </form>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              <div class="flex justify-center items-center">
                <div class="text-right ml-5 text-2xl">${(order.product_price * order.quantity).toLocaleString('ko-KR')}</div>
              </div>
            </td>
            <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
              ${btnHtml}
            </td>
          </tr>
          `;

        $orderList.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (orders.length === 0) {
      let tempHtml = '<div>주문 내역이 존재하지 않습니다</div>';
      $orderList.insertAdjacentHTML('beforeend', tempHtml);
    }
  } catch (err) {
    console.log('err: ', err);
    // alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}

// 기간 조회

// 주문 수정

// 주문 취소

// 결제 완료
