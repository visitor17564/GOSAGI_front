export const generateProductCard = async (product, reviews) => {
  const thumbnail = document.getElementById('product-thumbnail');
  const basicInfo = document.getElementById('product-basic-info');
  const productDetail = document.getElementById('product-detail');
  const productReview = document.getElementById('product-review');
  const donateValue = Math.ceil(product.point / 3) * 10;
  const detailContent = product.productContent[0].content;
  console.log(detailContent);
  const fixedContent = detailContent.replaceAll('src="/upload', 'src="https://ilovegohyang.go.kr/upload');
  console.log(fixedContent);

  thumbnail.innerHTML = `<img src="${product.productThumbnail[0].image_url}" class="aspect-square object-contain object-center w-full overflow-hidden max-md:max-w-full" />
  <div class="flex gap-5 flex-row overflow-auto mx-auto">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/def2e378aa743fbc0525c087abe01d089289a4b23fd4da7f6ec7d5c22ead355f?" class="aspect-[0.54] object-contain object-center w-[7px] stroke-[1.5px] stroke-black overflow-hidden self-center shrink-0 max-w-full my-auto" />
    <img loading="lazy" src="../../sourse/image/sample.png" class="aspect-square object-contain object-center w-[45px] overflow-hidden self-stretch shrink-0 max-w-full" />
    <img loading="lazy" src="../../sourse/image/sample.png" class="aspect-square object-contain object-center w-[45px] overflow-hidden self-stretch shrink-0 max-w-full" />
    <img loading="lazy" src="../../sourse/image/sample.png" class="aspect-square object-contain object-center w-[45px] overflow-hidden self-stretch shrink-0 max-w-full" />
    <img loading="lazy" src="../../sourse/image/sample.png" class="aspect-square object-contain object-center w-[45px] overflow-hidden self-stretch shrink-0 max-w-full" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e665837b135b992643a03878e60fe369904b32f45282902b681e572d86844c1f?" class="aspect-[0.46] object-contain object-center w-1.5 stroke-[1.5px] stroke-black overflow-hidden self-center shrink-0 max-w-full my-auto" />
  </div>`;
  basicInfo.innerHTML = `<div class="text-black text-3xl font-bold max-md:max-w-full font-['Inter']">${product.name}</div>
  <div class="text-zinc-500 text-xl mt-3.5 max-md:max-w-full font-['Inter']">${product.description}</div>
  <div class="bg-stone-300 self-stretch shrink-0 h-px my-14"></div>
  <div class="justify-center items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
    <div class="justify-center text-red-500 text-2xl font-bold whitespace-nowrap font-['Inter']">${product.point.toLocaleString()}</div>
    <div class="text-zinc-500 text-base mt-2.5 self-start font-['Inter']">&nbsp기부포인트&nbsp</div>
    <div class="text-zinc-500 text-base grow shrink basis-auto mt-2.5 self-start max-md:max-w-full">
      (
      <span class="font-bold font-['Inter']">${donateValue.toLocaleString()}</span>
      원 기부하면
      <span class="font-bold font-['Inter']">${product.point.toLocaleString()}</span>
      포인트를 얻을 수 있어요)
    </div>
  </div>
  <div class="justify-center items-stretch flex gap-0 mt-3 self-start">
    <div class="justify-center text-black text-2xl font-bold grow whitespace-nowrap font-['Inter']">40,000</div>
    <div class="text-zinc-500 text-base grow whitespace-nowrap mt-2.5 self-start font-['Inter']">&nbsp실구매가&nbsp</div>
  </div>
  <div class="items-stretch flex gap-3 mt-3 self-start">
    <div class="justify-center items-stretch flex gap-1">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef54c7d82651c6268e8ccb64862f2bfb330e69206475f1633c80e2c09f237a46?" class="aspect-[1.11] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef54c7d82651c6268e8ccb64862f2bfb330e69206475f1633c80e2c09f237a46?" class="aspect-[1.11] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef54c7d82651c6268e8ccb64862f2bfb330e69206475f1633c80e2c09f237a46?" class="aspect-[1.11] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef54c7d82651c6268e8ccb64862f2bfb330e69206475f1633c80e2c09f237a46?" class="aspect-[1.11] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef54c7d82651c6268e8ccb64862f2bfb330e69206475f1633c80e2c09f237a46?" class="aspect-[1.11] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full" />
      <div class="text-red-500 text-base font-['Inter']">0.0</div>
    </div>
    <div class="justify-center items-stretch flex gap-1.5 px-px self-start">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/81a9187fcf0639524b2aa86b75a057673b8295be864d71dc1fce13aebd435f6f?" class="aspect-[0.5] object-contain object-center w-[5px] stroke-[1.5px] stroke-zinc-500 overflow-hidden self-center shrink-0 max-w-full my-auto" />
    </div>
  </div>
  <div class="bg-stone-300 self-stretch shrink-0 h-px my-14"></div>
  <div class="text-zinc-500 text-base self-start max-md:mt-10 font-['Inter']">판매자 : 판매자 샘플</div>
  <div class="text-zinc-500 text-base mt-2.5 self-start font-['Inter']">배송방법 : 택배(우체국택배)</div>
  <div class="text-zinc-500 text-base mt-2.5 self-start font-['Inter']">배송비 : 무료</div>
  <div class="items-stretch bg-gray-200 flex flex-col mt-6 px-3.5 py-2.5 rounded-2xl max-md:max-w-full">
    <div class="text-black text-base max-md:max-w-full font-['Inter']">${product.name}</div>
    <div class="justify-between items-stretch flex w-full gap-5 mt-3 max-md:max-w-full max-md:flex-wrap">
      <div class="relative flex items-center justify-center">
        <button type="button" id="count-button" data-input-counter-decrement="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
          </svg>
        </button>
        <input type="text" id="counter-input" data-input-counter class="flex-shrink-0 font-['Inter'] text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value="1" required />
        <button type="button" id="increment-button" data-input-counter-increment="counter-input" class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
      <div class="text-black text-right text-xl text-base font-bold self-center w-60 my-auto font-['Inter']">30,000</div>
    </div>
  </div>
  <div class="items-stretch flex justify-between mt-5 max-md:max-w-full max-md:flex-wrap">
    <div class="w-[10%] mr-2 flex justify-center items-center border bg-white basis-[0%] flex-col px-2.5 py-1.5 rounded-md border-solid border-neutral-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>  
      <div class="justify-center text-black text-center text-xs self-stretch whitespace-nowrap font-['Inter']">1,234</div>
    </div>
    <a href="https://ilovegohyang.go.kr/items/details-main.html?code=G${product.code}" target="_blank" class="w-[30%] mx-2 text-zinc-500 text-center text-xl whitespace-nowrap items-stretch border bg-white grow justify-center px-5 py-5 rounded-md border-solid border-red-500 max-md:px-5 font-['Inter']">기부하러가기</a>
    <button class="w-[30%] mx-2 text-zinc-500 text-center text-xl whitespace-nowrap items-stretch border bg-white grow justify-center px-6 py-5 rounded-md border-solid border-red-500 max-md:px-5 font-['Inter']">장바구니담기</button>
    <button class="w-[30%] ml-2 text-white text-center text-xl whitespace-nowrap items-stretch border bg-red-400 grow justify-center px-6 py-5 rounded-md border-solid border-red-500 max-md:px-5 font-['Inter']">바로구매</button>
  </div>`;
  productDetail.innerHTML = `<div class="mt-12 flex justify-center">${fixedContent}</div>`;
  productReview.innerHTML = `상품후기 (총 <span class="text-orange-400">${reviews.data.length}</span>건)`;
};

export const generateProductReviews = async (reviews) => {
  if (reviews.review_length === 0) {
    return;
  }
  const productReviewTable = document.getElementById('product-review-table');
  productReviewTable.innerHTML = reviews.data
    .map((review) => {
      return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white font-['Inter']">
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
          <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      </th>
      <td class="px-6 py-4 font-['Inter'] text-center">장충동 왕족발 보싸아암</td>
      <td class="px-6 py-4 font-['Inter'] text-center">정창일</td>
      <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">2024-01-01</td>
    </tr>`;
    })
    .join('');
};

export const generateProductQuestions = async (questions) => {
  if (questions.length === 0) {
    return;
  }
  const productQuestionTable = document.getElementById('product-question-table');
  productQuestionTable.innerHTML = questions
    .map((question) => {
      return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white font-['Inter']">1</th>
      <td class="px-6 py-4 font-['Inter'] text-center">1주일째 상품이 안와요</td>
      <td class="px-6 py-4 font-['Inter'] text-center">정창일</td>
      <td class="px-6 py-4 font-['Inter'] text-center">2024-01-01</td>
      <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
        <button class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변완료</button>
        <button class="h-5 w-1/2 justify-center hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변대기중</button>
      </td>
    </tr>`;
    })
    .join('');
};

let queryString = window.location.search;
// URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
let searchParams = new URLSearchParams(queryString);
// detail_id 매개변수의 값을 가져옵니다
let productId = parseInt(searchParams.get('productId'));

export async function getProduct(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`http://localhost:3000/goods/detail/${productId}`, { withCredentials: true });
    return response.data.data;
  } catch (err) {
    // 오류 처리
    alert(err);
  }
}

export async function getProductReview() {
  try {
    // axios를 사용하여 로그인 API 실행
    const review = await axios.get(`http://localhost:3000/review/product/${productId}`, { withCredentials: true });
    return review.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function getProductQuestion() {
  try {
    // axios를 사용하여 로그인 API 실행
    const questions = await axios.get(`http://localhost:3000/question/productList/${productId}`, { withCredentials: true });
    return questions.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

const product = await getProduct(productId);
const reviews = await getProductReview(productId);
const questions = await getProductQuestion(productId);

generateProductCard(product, reviews);
generateProductQuestions(questions);
generateProductReviews(reviews);
