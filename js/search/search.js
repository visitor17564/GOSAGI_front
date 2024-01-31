import { generateProductCards } from '../main.js';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const productWrap = document.getElementById('product-wrap');

export async function searchProduct(keyword) {
  try {
    const response = await axios.get(`http://localhost:3000/goods/keyword?keyword=${keyword}&page=1`, { withCredentials: true });
    if (response.data.data.length === 0) {
      alert('검색결과가 없습니다.');
      window.location.href = `http://localhost:5500/html/index.html`;
    }
    await generateProductCards(response.data.data, productWrap);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

searchButton.addEventListener('click', async () => {
  const keyword = await searchInput.value;
  const encodeKeyword = encodeURI(keyword);
  window.location.href = `http://localhost:5500/html/index.html?keyword=${encodeKeyword}`;
});
