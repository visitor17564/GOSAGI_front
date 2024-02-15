export async function getProductReview(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const review = await axios.get(`https://back.gosagi.com/review/product/${productId}`, { withCredentials: true });
    return review.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export const generateProductReviews = async (reviews) => {
  if (reviews.review_length === 0) {
    const productReview = document.getElementById('product-review');
    productReview.innerHTML = `상품후기 (총 <span class="text-orange-400">${reviews.data.length}</span>건)`;
    return;
  }
  const productReviewTable = document.getElementById('product-review-table');
  const productReview = document.getElementById('product-review');
  productReview.innerHTML = `상품후기 (총 <span class="text-orange-400">${reviews.data.length}</span>건)`;
  productReviewTable.innerHTML = reviews.data
    .map((review) => {
      let starArr = ['gray-300', 'gray-300', 'gray-300', 'gray-300', 'gray-300'];
      for (let e = 0; e <= review.rate - 1; e++) {
        starArr[e] = 'yellow-300';
      }
      return `<tr class="bg-white border-b ">
      <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
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
      </th>
      <td class="px-6 py-4 font-['Inter'] text-center">${review.content}</td>
      <td class="px-6 py-4 font-['Inter'] text-center">${review.user.nickname}</td>
      <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">${review.created_at.slice(0, 10)}</td>
    </tr>`;
    })
    .join('');
};
