const $recentView = document.getElementById('recent-view');

export async function addToRecentViewed(id, thumbnail_image) {
  // 쿠키에서 최근 본 상품 목록 가져오기
  const recentViewedProducts = await getRecentViewedProducts();
  const product = { id: id, thumbnail_image: thumbnail_image };
  // 이미 최근 본 상품 목록에 있는 경우 제외
  for (let a = 0; a < recentViewedProducts.length; a++) {
    if (recentViewedProducts[a].id === product.id) {
      return;
    }
  }
  // 최근 본 상품 목록에 상품 추가
  if (recentViewedProducts.length >= 5) {
    recentViewedProducts.pop();
    recentViewedProducts.unshift(product);
  } else {
    recentViewedProducts.unshift(product);
  }

  // 쿠키에 최근 본 상품 목록 저장
  setRecentViewedProducts(recentViewedProducts);
}

export async function getRecentViewedProducts() {
  // 쿠키에서 최근 본 상품 목록 가져오기

  const cookieValue = Cookies.get('recentViewedProducts');

  // 쿠키에 값이 없는 경우 빈 배열 반환
  if (!cookieValue) {
    return [];
  }

  // 쿠키 값을 JSON으로 파싱하여 배열 반환
  return JSON.parse(cookieValue);
}

export async function setRecentViewedProducts(products) {
  // 최근 본 상품 목록을 JSON으로 문자열화
  const cookieValue = JSON.stringify(products);

  // 쿠키에 최근 본 상품 목록 저장
  await Cookies.set('recentViewedProducts', cookieValue, {
    expires: 1,
  });
}

const recentViewedProducts = await getRecentViewedProducts();
generateRecentViewedProducts(recentViewedProducts);

export async function generateRecentViewedProducts() {
  let html = '';
  for (let i = 0; i < recentViewedProducts.length; i++) {
    html += `
      <div class="bg-stone-300 self-stretch shrink-0 h-px mt-2.5"></div>
      <a class="px-6 py-4 font-['Inter'] flex items-center justify-center" href="/html/search/detail.html?productId=${recentViewedProducts[i].id}">
        <img src="${recentViewedProducts[i].thumbnail_image}" class="aspect-square object-contain object-center w-32 overflow-hidden" />
      </a>
    `;
  }
  $recentView.innerHTML = html;
  return html;
}
