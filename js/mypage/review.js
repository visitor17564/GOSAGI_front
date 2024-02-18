import * as modalAPI from '../util/open-close-modal.js';

// DOM 요소들
const reviewDiv = document.getElementById('product-review-wrap');
const reviewModalDiv = document.getElementById('review-modal-wrap');

async function drawReviewList() {
  try {
    // 리뷰 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/review', {
      withCredentials: true,
    });

    const reviews = response.data.data;
    if (reviews.review_count >= 1) {
      reviewDiv.innerHTML = '';
      reviews.reviews.forEach((review) => {
        // const category = question.question.product_id < 3 ? '이용문의' : '상품문의';
        // const waitAnswer = question.status === '답변대기' ? '' : 'hidden ';
        // const completeAnswer = question.status === '답변대기' ? 'hidden ' : ''; 히히..
        let starArr = ['gray-300', 'gray-300', 'gray-300', 'gray-300', 'gray-300'];
        for (let e = 0; e <= review.rate - 1; e++) {
          starArr[e] = 'yellow-300';
        }

        let tempHtml = `
        <tr class="bg-white border-b">
        <th class="px-6 py-4 font-['Inter'] flex items-center justify-center">
          <img src="${review.order.product.thumbnail_image}" class="aspect-square object-contain object-center w-32 overflow-hidden" alt=""/>
          <div product-name class="w-full ml-5">${review.order.product.name}</div></th>
        <td class="px-6 py-4 font-['Inter'] text-center">${review.content}</td>
        <td class="px-6 py-4 font-['Inter']">
          <div class="flex mb-5 justify-center items-center">
            <svg class="w-4 h-4 ms-1 text-${starArr[0]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-${starArr[1]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-${starArr[2]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-${starArr[3]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-${starArr[4]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
        </td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">${review.created_at.slice(0, 10)}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
          <button id="fixReview:${review.id}" class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">수정</button>
          <button id="deleteReview:${review.id}" class="h-5 w-1/2 justify-center hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">삭제</button>
        </td>
      </tr>
      `;
        reviewDiv.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (reviews.length === 0) {
      let tempHtml = '<div>문의 내역이 존재하지 않습니다</div>';
      reviewDiv.insertAdjacentHTML('beforeend', tempHtml);
    }
  } catch (err) {
    alert(err.response.data.message);
    console.log(err);
  }
}

drawReviewList();

let reviewId = 0;

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let modalClicked = String(clickedElementId).includes('fixReview') || String(clickedElementId).includes('deleteReview');
  if (modalClicked) {
    reviewId = Number(String(clickedElementId).split(':')[1]);
  }
  if (String(clickedElementId).includes('deleteReview')) {
    deleteReview(reviewId);
  }
  if (String(clickedElementId).includes('fixReview')) {
    modalAPI.openModal('review-modal');
    const stars = document.getElementsByName('score');
    try {
      const review = await axios.get(`https://back.gosagi.com/review/${reviewId}`, {
        withCredentials: true,
      });
      const reviewContent = document.getElementById('review-content');
      reviewContent.value = review.data.data.content;
      let starNum = 0;
      review.data.data.rate === 5 ? (starNum = 0) : review.data.data.rate === 4 ? (starNum = 1) : review.data.data.rate === 3 ? (starNum = 2) : review.data.data.rate === 2 ? (starNum = 3) : (starNum = 4);
      stars[starNum].checked = true;
    } catch (err) {}
  }
});

const reviewFixButton = document.getElementById('review-fix-button');
reviewFixButton.addEventListener('click', async () => {
  const reviewContent = document.getElementById('review-content');
  // 'score'라는 이름을 가진 라디오 버튼들을 모두 선택합니다.
  let stars = document.getElementsByName('score');
  let starNum = 0;
  for (var i = 0; i < stars.length; i++) {
    // 만약 라디오 버튼 중 하나가 선택되었다면,
    if (stars[i].checked) {
      // 그 라디오 버튼의 value 값을 얻습니다.
      starNum = stars[i].value;
      break;
    }
  }
  fixReview(reviewId, starNum, reviewContent.value);
});

async function deleteReview(reviewId) {
  try {
    await axios.delete(`https://back.gosagi.com/review/${reviewId}`, {
      withCredentials: true,
    });
    alert('리뷰가 삭제되었습니다.');
    window.location.reload();
  } catch (err) {}
}

async function fixReview(reviewId, rate, content) {
  try {
    await axios.patch(
      `https://back.gosagi.com/review/${reviewId}`,
      {
        rate,
        content,
      },
      {
        withCredentials: true,
      },
    );
    alert('리뷰가 수정되었습니다.');
    window.location.reload();
  } catch (err) {}
}
