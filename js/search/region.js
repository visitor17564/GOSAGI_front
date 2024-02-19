import { searchProduct } from './search.js';
import { generateProductCards } from '../main-product.js';
import { setPageButtons, getTotalPageCount } from '../util/product-pagenation.js';

let page = 1;
let pageGroup = 1;
let location = '경기도';
let countUrl = '';

const productWrap = document.getElementById('product-region-wrap');
const previousBtn = document.getElementById('previous-button');
const nextBtn = document.getElementById('next-button');

async function makeCountUrl(location) {
  return `https://back.gosagi.com/goods/count/location?location=${location}`;
}

export async function getProductByLocation(location, page) {
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`https://back.gosagi.com/goods/location?location=${location}&page=${page}`);
    return response.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

if (decodeURI(window.location.search.split('=')[0]) === '?keyword' && decodeURI(window.location.search.split('=')[1]) !== 'undefined') {
  const keyword = decodeURI(window.location.search.split('=')[1]);
  searchProduct(keyword);
} else if (decodeURI(window.location.search.split('=')[0]) === '?productId') {
} else if (window.location.href.includes('search-for-region')) {
  const products = await getProductByLocation(location, page);
  countUrl = await makeCountUrl(location);
  generateProductCards(products, productWrap);
  await setPageButtons(pageGroup, countUrl);
}

document.addEventListener('click', async () => {
  let clickedElementId = decodeURI(event.target.id);
  let buttonClicked = String(clickedElementId).includes('select-region');
  if (buttonClicked) {
    location = String(clickedElementId).split('-')[2];
    page = 1;
    const products = await getProductByLocation(location, page);
    await generateProductCards(products, productWrap);
    countUrl = await makeCountUrl(location);
    pageGroup = 1;
    await setPageButtons(pageGroup, countUrl);
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

previousBtn.addEventListener('click', async () => {
  pageGroup--;
  countUrl = await makeCountUrl(category);
  await setPageButtons(pageGroup, countUrl);
});

nextBtn.addEventListener('click', async () => {
  pageGroup++;
  countUrl = await makeCountUrl(category);
  await setPageButtons(pageGroup, countUrl);
});
