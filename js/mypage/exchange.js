const $orderList = document.getElementById('order-list');
const $cancelFinCnt = document.getElementById('cancel-fin-cnt');
const $refundFinCnt = document.getElementById('refund-fin-cnt');
const $periodBtns = document.querySelectorAll('[period-btn ]');
let daysQuery = '';
let statusQuery = '';
// 주문 목록 그리기
document.addEventListener('DOMContentLoaded', async function () {
  await initalize();
});

async function initalize() {
  await getAllOrderList();
}

async function drawOrderList(response) {
  try {
    const orders = response.data.data.data;
    console.log(orders);

    let btnHtml;
    let cancelFinCnt = 0;
    let refundFinCnt = 0;
    let status;

    if (orders.length >= 1) {
      $orderList.innerHTML = '';
      orders.forEach((order) => {
        if (order.status == 4) {
          (status = '주문취소'), cancelFinCnt++;
        }
        if (order.status == 5) {
          (status = '반품신청'), refundFinCnt++;
        }
        if (order.status == 6) {
          (status = '반품완료'), refundFinCnt++;
        }
        if (order.status == 7) {
          (status = '교환신청'), exchangeFinCnt++;
        }
        btnHtml = `<button class="h-5 w-1/2 justify-center border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">${status}</button>`;

        btnHtml = `<button class="h-5 w-1/2 justify-center border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">${status}</button>`;
        let tempHtml = `
          <tr id="${order.id}" class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
            ${order.createdAt.slice(0, 10)}
            </th>
            <td class="px-6 py-4 font-['Inter'] flex items-center justify-center">
                <img src="${order.product_thumbnail}"
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

      $cancelFinCnt.innerText = cancelFinCnt;
      $refundFinCnt.innerText = refundFinCnt;
    }
    if (orders.length === 0) {
      let tempHtml = '<div>주문 내역이 존재하지 않습니다</div>';
      $orderList.innerHTML = tempHtml;
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

// 취소/반품목록 조회
async function getAllOrderList(daysQuery, statusQuery) {
  // 취소/반품목록 조회 API 실행
  const response = await axios.get(
    `https://back.gosagi.com/order/return?${daysQuery}${statusQuery}`,
    {
      start_period: '2024-01-10',
      end_period: '2024-01-30',
    },
    {
      withCredentials: true,
    },
  );

  await drawOrderList(response);
}

// 기간 조회
const $searchButton = document.getElementById('search-button');
const $startDate = document.getElementById('start-date');
const $endDate = document.getElementById('end-date');
const $1days = document.getElementById('1days');
const $7days = document.getElementById('7days');
const $30days = document.getElementById('30days');
const $90days = document.getElementById('90days');
const $365days = document.getElementById('365days');

// $searchButton.addEventListener('click', async function () {
//   const response = await axios.get(`https://back.gosagi.com/order/return?`, {
//     withCredentials: true,
//   });
// });

$1days.addEventListener('click', function (event) {
  const targetId = event.target.id;
  daysQuery = `period=${targetId}`;
  getAllOrderList(daysQuery);
});

$7days.addEventListener('click', function (event) {
  const targetId = event.target.id;
  daysQuery = `period=${targetId}`;
  getAllOrderList(daysQuery);
});

$30days.addEventListener('click', function (event) {
  const targetId = event.target.id;
  daysQuery = `period=${targetId}`;
  getAllOrderList(daysQuery);
});

$90days.addEventListener('click', function (event) {
  const targetId = event.target.id;
  daysQuery = `period=${targetId}`;
  getAllOrderList(daysQuery);
});

$365days.addEventListener('click', function (event) {
  const targetId = event.target.id;
  daysQuery = `period=${targetId}`;
  getAllOrderList(daysQuery);
});

$searchButton.addEventListener('click', function (event) {});
