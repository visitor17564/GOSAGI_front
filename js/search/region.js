import { searchProduct } from './search.js';
import { generateProductCards } from '../main.js';

let page = 1;
let location = '경기도';

const productWrap = document.getElementById('product-region-wrap');

export async function getProductByLocation(location, page) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`https://back.gosagi.com/goods/location?location=${location}&page=${page}`);
    return response.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function setPageButtons(location) {
  const numberButtonWrapper = document.getElementById('page-button-wrap');
  numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
  for (let i = 1; i <= (await getTotalPageCount(location)); i++) {
    numberButtonWrapper.innerHTML += `<button id="clicked-page-button:${i}" type="button" class="number-button mx-3 hover:text-red-300 focus:text-red-300 "> ${i} </button>`;
  }
}

const COUNT_PER_PAGE = 12;
export async function getTotalPageCount(location) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`https://back.gosagi.com/goods/count/location?location=${location}`);
    return Math.ceil(response.data.data / COUNT_PER_PAGE);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

if (decodeURI(window.location.search.split('=')[0]) === '?keyword' && decodeURI(window.location.search.split('=')[1]) !== 'undefined') {
  const keyword = decodeURI(window.location.search.split('=')[1]);
  searchProduct(keyword);
} else if (decodeURI(window.location.search.split('=')[0]) === '?productId') {
} else if (window.location.href.includes('search-for-region')) {
  const products = await getProductByLocation(location, page);
  generateProductCards(products, productWrap);
  setPageButtons(location);
}

document.addEventListener('click', async () => {
  let clickedElementId = decodeURI(event.target.id);
  let buttonClicked = String(clickedElementId).includes('select-region');
  if (buttonClicked) {
    location = String(clickedElementId).split('-')[2];
    page = 1;
    const products = await getProductByLocation(location, page);
    generateProductCards(products, productWrap);
    setPageButtons(location);
  }
});

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let buttonClicked = String(clickedElementId).includes('clicked-page-button');
  if (buttonClicked) {
    page = Number(String(clickedElementId).split(':')[1]);
    const products = await getProductByLocation(location, page);
    generateProductCards(products, productWrap);
  }
});
