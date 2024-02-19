import { generateProductCards } from '../main-product.js';
import { setPageButtons, getTotalPageCount } from '../util/product-pagenation.js';

let page = 1;
let pageGroup = 1;
let countUrl = '';

const productWrap = document.getElementById('product-wrap');

// ----------- document 이벤트 ----------
// body가 클릭되었을 때
document.body.addEventListener('click', async function (event) {
  await clickSearchBtn();
});
// ---------- 메서드 ----------
export async function searchProduct(keyword, page) {
  if (!page) {
    page = 1;
  }
  try {
    const response = await axios.get(`https://back.gosagi.com/goods/keyword?keyword=${keyword}&page=${page}`, { withCredentials: true });
    if (response.data.data.length === 0) {
      alert('검색결과가 없습니다.');
      window.location.href = `/`;
    }
    await generateProductCards(response.data.data, productWrap);
    countUrl = await makeCountUrl(keyword);
    await setPageButtons(pageGroup, countUrl);

    document.addEventListener('click', async () => {
      let clickedElementId = event.target.id;
      let buttonClicked = String(clickedElementId).includes('clicked-page-button');
      if (buttonClicked) {
        console.log('1페이지는?');
        page = Number(String(clickedElementId).split(':')[1]);
        const keyword = decodeURI(window.location.search.split('=')[1]);
        const products = await getSearchProduct(keyword, page);
        generateProductCards(products, productWrap);
      }
    });
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

async function clickSearchBtn() {
  const $searchInput = document.getElementById('search-input');
  document.getElementById('search-button').addEventListener('click', () => {
    const keyword = $searchInput.value;
    const encodeKeyword = encodeURI(keyword);
    window.location.href = `/?keyword=${encodeKeyword}`;
  });
  $searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const keyword = $searchInput.value;
      const encodeKeyword = encodeURI(keyword);
      window.location.href = `/?keyword=${encodeKeyword}`;
    }
  });
}

async function getSearchProduct(keyword, page) {
  const response = await axios.get(`https://back.gosagi.com/goods/keyword?keyword=${keyword}&page=${page}`, { withCredentials: true });
  if (response.data.data.length === 0) {
    alert('검색결과가 없습니다.');
    window.location.href = `/`;
  }
  return response.data.data;
}

async function makeCountUrl(keyword) {
  return `https://back.gosagi.com/goods/count/keyword?keyword=${keyword}`;
}
