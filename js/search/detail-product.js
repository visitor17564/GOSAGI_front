import * as countDOM from './detail-count.js';

export const generateProductCard = async (product, reviews) => {
  // DOM 설정
  const goToDonationButton = document.getElementById('go-to-donation');
  const thumbnail = document.getElementById('product-thumbnail');
  const basicInfo = document.getElementById('product-basic-info');
  const productDetail = document.getElementById('product-detail');
  const productTotalPrice = document.getElementById('product-total-price');
  const addCartButton = document.getElementById('add-cart-button');
  const purchaseButton = document.getElementById('purchase-button');
  const countDiv = document.getElementById('count-div');

  const donateValue = Math.ceil(product.point / 3) * 10;
  const detailContent = product.productContent[0].content;
  const imgFixedContent = detailContent.replaceAll('src="/upload', 'src="https://ilovegohyang.go.kr/upload');
  const embedFixedContent = imgFixedContent.replaceAll('watch?v=-', 'embed/');
  goToDonationButton.href = `https://ilovegohyang.go.kr/items/details-main.html?code=G${product.code}`;
  let goToDonation = '';
  let pushCart = '';
  if (product.store_id === 1 || product.store_id === 2) {
    pushCart = 'hidden ';
    addCartButton.style.display = 'none';
    purchaseButton.style.display = 'none';
    countDiv.style.display = 'none';
  }

  let review_average_rate = 0;
  if (reviews.review_average_rate !== null) {
    review_average_rate = reviews.review_average_rate;
  }

  thumbnail.innerHTML = `<img src="${product.thumbnail_image}" class="h-full w-full rounded-lg aspect-square object-contain object-center overflow-hidden" />`;
  let starArr = ['gray-300', 'gray-300', 'gray-300', 'gray-300', 'gray-300'];
  for (let e = 0; e <= review_average_rate - 1; e++) {
    starArr[e] = 'yellow-300';
  }
  if (product.point === 0) {
    goToDonationButton.style.display = 'none';
    goToDonation = 'hidden ';
  }
  // thumbnail.innerHTML = product.productThumbnail
  //   .map((Thumbnail) => {
  //     return `<div class="hidden duration-700 ease-in-out" data-carousel-item>
  //               <img src="${Thumbnail.image_url}" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
  //             </div>`;
  //   })
  //   .join('');
  basicInfo.innerHTML = `<div id="product-name" class="text-black text-3xl font-bold max-md:max-w-full font-['Inter']">${product.name}</div>
  <div class="text-zinc-500 text-xl mt-3.5 max-md:max-w-full font-['Inter']">${product.description}</div>
  <div class="bg-stone-300 self-stretch shrink-0 h-px my-14"></div>
  <div class="${goToDonation}justify-center items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
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
  <div class="${pushCart}justify-center items-stretch flex gap-0 mt-3 self-start">
    <div id="product-price" class="justify-center text-black text-2xl font-bold grow whitespace-nowrap font-['Inter']">${product.price.toLocaleString()}</div>
    <div class="text-zinc-500 text-base grow whitespace-nowrap mt-2.5 self-start font-['Inter']">&nbsp실구매가&nbsp</div>
  </div>
  <div class="items-stretch flex gap-3 mt-3 self-start">
    <div class="justify-center items-stretch flex gap-1">
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
      <div class="text-red-500 text-base font-['Inter']">&nbsp;${review_average_rate}</div>
    </div>
  </div>
  <div class="bg-stone-300 self-stretch shrink-0 h-px my-14"></div>
  <div class="text-zinc-500 text-base mt-2.5 self-start font-['Inter']">배송방법 : 택배(우체국택배)</div>
  <div class="text-zinc-500 text-base mt-2.5 self-start font-['Inter']">배송비 : 무료</div>
  
`;
  countDOM.countProductName.innerHTML = `<div class="text-black text-base max-md:max-w-full font-['Inter']">${product.name}</div>`;
  productDetail.innerHTML = `<div class="mt-12 flex justify-center">${embedFixedContent}</div>`;
  productTotalPrice.innerText = product.price.toLocaleString();
};

export async function getProduct(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`https://back.gosagi.com/goods/detail/${productId}`, { withCredentials: true });

    return response.data.data;
  } catch (err) {
    // 오류 처리
    alert(err.response.data.message);
  }
}
