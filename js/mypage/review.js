// DOM 요소들
const reviewDiv = document.getElementById('product-review-wrap');
const reviewModalDiv = document.getElementById('review-modal-wrap');

async function drawReviewList() {
  try {
    // 문의 목록 조회 API 실행
    const response = await axios.get('http://localhost:3000/review', {
      withCredentials: true,
    });

    const reviews = response.data.data;
    console.log(reviews);
    if (reviews.review_count >= 1) {
      reviewDiv.innerHTML = '';
      reviews.reviews.forEach((review) => {
        // const category = question.question.product_id < 3 ? '이용문의' : '상품문의';
        // const waitAnswer = question.status === '답변대기' ? '' : 'hidden ';
        // const completeAnswer = question.status === '답변대기' ? 'hidden ' : ''; 히히..

        let tempHtml = `<tr class="bg-white border-b">
        <th class="px-6 py-4 font-['Inter'] text-center">${review.content}</th>
        <td class="px-6 py-4 font-['Inter']">
          <div class="flex mb-5 justify-center items-center">
            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 ms-1 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
        </td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">${review.created_at.slice(0, 10)}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
          <button class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">수정</button>
          <button id="deleteReview:${review.id}" class="h-5 w-1/2 justify-center hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">삭제</button>
        </td>
      </tr>`;

        reviewDiv.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (reviews.length === 0) {
      let tempHtml = '<div>문의 내역이 존재하지 않습니다</div>';
      reviewDiv.insertAdjacentHTML('beforeend', tempHtml);
    }
  } catch (err) {
    console.log('err: ', err);
    // alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
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
});

async function deleteReview(reviewId) {
  try {
    await axios.delete(`http://localhost:3000/review/${reviewId}`, {
      withCredentials: true,
    });
    alert('리뷰가 삭제되었습니다.');
    drawReviewList();
  } catch (err) {}
}
