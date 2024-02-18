import { searchProduct } from './search.js';
import { setPageButtons, getTotalPageCount } from '../util/product-pagenation.js';
import { generateProductCards } from '../main-product.js';

let page = 1;
let pageGroup = 1;
let category = '관광서비스';
let countUrl = '';
const COUNT_PER_PAGE = 12;

const productWrap = document.getElementById('product-category-wrap');
const previousBtn = document.getElementById('previous-button');
const nextBtn = document.getElementById('next-button');

async function makeCountUrl(category) {
  return `https://back.gosagi.com/goods/count/category/${category}`;
}

export async function getProductByCategory(category, page) {
  if (!page) {
    page = 1;
  }
  try {
    // axios를 사용하여 로그인 API 실행
    const response = await axios.get(`https://back.gosagi.com/goods/category/${category}?&page=${page}`);
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
} else if (window.location.href.includes('search-for-category')) {
  countUrl = await makeCountUrl(category);
  const products = await getProductByCategory(category, page);
  await generateProductCards(products, productWrap);
  await setPageButtons(pageGroup, countUrl);
}

const categoryBtn = document.querySelectorAll('.category-button');

categoryBtn.forEach((button) => {
  button.addEventListener('click', async () => {
    category = String(button.id).split('-')[2];
    page = 1;
    const products = await getProductByCategory(category, page);
    await generateProductCards(products, productWrap);
    countUrl = await makeCountUrl(category);
    await setPageButtons(pageGroup, countUrl);
  });
});

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let buttonClicked = String(clickedElementId).includes('clicked-page-button');
  if (buttonClicked) {
    page = Number(String(clickedElementId).split(':')[1]);
    const products = await getProductByCategory(category, page);
    await generateProductCards(products, productWrap);
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
