import { searchProduct } from './search/search.js';
import { generateProductCards, getProduct } from './main-product.js';
import { setPageButtons, getTotalPageCount } from './util/product-pagenation.js';

let page = 1;
let pageGroup = 1;

const productWrap = document.getElementById('product-wrap');
const previousBtn = document.getElementById('previous-button');
const nextBtn = document.getElementById('next-button');

const url = `https://back.gosagi.com/goods/count/all`;

if (decodeURI(window.location.search.split('=')[0]) === '?keyword' && decodeURI(window.location.search.split('=')[1]) !== 'undefined') {
  const keyword = decodeURI(window.location.search.split('=')[1]);
  searchProduct(keyword);
} else if (decodeURI(window.location.search.split('=')[0]) === '?productId') {
} else if (window.location.href.includes('search')) {
} else {
  const products = await getProduct(page);
  generateProductCards(products, productWrap);
  setPageButtons(pageGroup, url);
  // 페이지네이션 버튼 클릭시 로직
  document.addEventListener('click', async () => {
    let clickedElementId = event.target.id;
    let buttonClicked = String(clickedElementId).includes('clicked-page-button');
    if (buttonClicked) {
      const numberButtons = document.querySelectorAll('.number-button');
      const filteredElements = Array.from(numberButtons).filter((element) => element.classList.contains('text-red-300'));

      // `filteredElements`에는 `text-red-300` 클래스가 있는 요소만 포함됩니다.
      filteredElements.forEach((element) => {
        element.classList.remove('text-red-300');
      });
      // .classList.add('text-black');
      event.target.classList.add('text-red-300');
      page = Number(String(clickedElementId).split(':')[1]);
      const products = await getProduct(page);
      generateProductCards(products, productWrap);
    }
  });
}

previousBtn.addEventListener('click', async () => {
  pageGroup--;
  setPageButtons(pageGroup, url);
});

nextBtn.addEventListener('click', async () => {
  pageGroup++;
  setPageButtons(pageGroup, url);
});
