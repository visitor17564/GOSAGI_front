import { generateProductCards } from '../main-product.js';

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
    const response = await axios.get(`https://back.gosagi.com/goods/keyword?keyword=${keyword}&page=1`, { withCredentials: true });
    if (response.data.data.length === 0) {
      alert('검색결과가 없습니다.');
      window.location.href = `/`;
    }
    await generateProductCards(response.data.data, productWrap);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

async function clickSearchBtn() {
  document.getElementById('search-button').addEventListener('click', () => {
    const $searchInput = document.getElementById('search-input');

    const keyword = $searchInput.value;
    const encodeKeyword = encodeURI(keyword);
    window.location.href = `/?keyword=${encodeKeyword}`;
  });
}
