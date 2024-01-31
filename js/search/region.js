import { searchProduct } from './search.js';

let page = 1;

const productWrap = document.getElementById('product-region-wrap');

export const generateProductCards = async (products, productWrap) => {
  productWrap.innerHTML = products
    .map((product) => {
      const localesPoint = product.point.toLocaleString();
      let averageRate = 0;
      if (product.average_rate !== null) {
        averageRate = product.average_rate;
      }
      let view = 0;
      if (product.views !== null) {
        view = product.views;
      }
      return `
      <a id="show-detail=${product.id}" href="http://localhost:5500/html/search/detail.html?productId=${product.id}" class="mt-8 flex flex-col rounded-lg shadow  items-stretch w-3/12 max-md:w-full max-md:ml-0 px-2 py-2">
      <div class="justify-center items-stretch bg-white flex w-full grow flex-col mx-auto max-md:mt-6">
        <!-- 상품이미지 -->
        <img src="${product.thumbnail_image}" class="h-full w-full rounded-lg aspect-square object-contain object-center w-full overflow-hidden" />
        <!-- 상품간단정보 -->
        <div class="w-3/4 self-center justify-center items-stretch flex flex-col mt-3.5 max-md:pl-5">
          <div class="text-neutral-400 text-sm max-md:ml-0.5 font-['Inter']">${product.description.substr(0, 20)}...</div>
          <div class="text-black text-base font-bold mt-1.5 max-md:ml-0.5 font-['Inter']">${product.name}</div>
          <div class="text-red-500 text-lg font-bold mt-1.5 max-md:ml-0.5 font-['Inter']">${localesPoint}</div>
        </div>
        <!-- 좋아요등카드 -->
        <div class="flex items-stretch justify-center gap-0 mt-3.5">
          <div class="w-1/2 border bg-white flex items-stretch justify-center gap-2 py-1.5 border-solid border-neutral-200 max-md:px-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <div class="justify-center text-neutral-400 text-xs font-bold mt-1 self-start font-['Inter']">${product.wish_count}</div>
          </div>
          <div class="w-1/2 border bg-white flex items-stretch justify-center gap-2 py-1.5 border-solid border-neutral-200 max-md:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill="#f0e138" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
          </svg>
            <div class="justify-center text-neutral-400 text-xs font-bold mt-1 self-start font-['Inter']">${averageRate}</div>
          </div>
        </div>
        <div class="flex items-stretch justify-center gap-0">
          <div class="w-1/2 border bg-white flex items-stretch justify-center gap-2 py-1.5 border-solid border-neutral-200 max-md:px-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <div class="justify-center text-neutral-400 text-xs font-bold mt-1 self-start font-['Inter']">${view}</div>
          </div>
          <div class="w-1/2 border bg-white flex items-stretch justify-center gap-2 py-1.5 border-solid border-neutral-200 max-md:px-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <div class="justify-center text-neutral-400 text-xs font-bold mt-1 self-start font-['Inter']">${product.review_count}</div>
          </div>
        </div>
      </div>
    </a>
      `;
    })
    .join('');
};

export async function getProductByCategory(location, page) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`http://localhost:3000/goods/location?location=${location}&page=${page}`);
    return response.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function setPageButtons() {
  const numberButtonWrapper = document.getElementById('page-button-wrap');
  numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
  for (let i = 1; i <= (await getTotalPageCount()); i++) {
    numberButtonWrapper.innerHTML += `<span class="number-button mx-3"> ${i} </span`;
  }
}

const COUNT_PER_PAGE = 12;
export async function getTotalPageCount() {
  // return Math.ceil(data.length / COUNT_PER_PAGE);
  return 12;
}

if (decodeURI(window.location.search.split('=')[0]) === '?keyword' && decodeURI(window.location.search.split('=')[1]) !== 'undefined') {
  const keyword = decodeURI(window.location.search.split('=')[1]);
  searchProduct(keyword);
} else if (decodeURI(window.location.search.split('=')[0]) === '?productId') {
} else if (window.location.href.includes('search-for-region')) {
  let location = '경기도';
  const products = await getProductByCategory(location, page);
  generateProductCards(products, productWrap);
}

const button1 = document.getElementById('경기도');
const button2 = document.getElementById('서울특별시');
const button3 = document.getElementById('부산광역시');
const button4 = document.getElementById('경상남도');
const button5 = document.getElementById('인천광역시');
const button6 = document.getElementById('경상북도');
const button7 = document.getElementById('대구광역시');
const button8 = document.getElementById('충청남도');
const button9 = document.getElementById('전라남도');
const button10 = document.getElementById('전북특별자치도');
const button11 = document.getElementById('충청북도');
const button12 = document.getElementById('강원특별자치도');
const button13 = document.getElementById('대전광역시');
const button14 = document.getElementById('광주광역시');
const button15 = document.getElementById('울산광역시');
const button16 = document.getElementById('제주특별자치도');
const button17 = document.getElementById('세종특별자치시');

button1.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button2.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button3.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button4.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button5.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button6.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button7.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button8.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button9.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button10.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button11.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button12.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button13.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button14.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button15.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button16.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
button17.addEventListener('click', async (event) => {
  let category = event.target.id;
  const products = await getProductByCategory(category, page);
  generateProductCards(products, productWrap);
});
