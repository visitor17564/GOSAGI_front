import { login, signup, logout } from './auth.js';

// ---------- DOM ----------
const $header = document.querySelector('header');

// ---------- 메소드 ----------
// 페이지 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', async () => {
  await drawHeader(); // 헤더 그리기
});

// 로그인 여부 확인
async function checkLoginStatus() {
  try {
    const response = await axios.get('https://back.gosagi.com/cart', {
      withCredentials: true,
    });
    return { isLoggedIn: true, cartsCount: response.data.data.cart_count };
  } catch (err) {
    return { isLoggedIn: false };
  }
}

// 헤더 그리기
async function drawHeader() {
  checkLoginStatus()
    .then(async ({ isLoggedIn, cartsCount }) => {
      const headerHtml = await createHeaderHtml(isLoggedIn, cartsCount);
      $header.insertAdjacentHTML('beforebegin', headerHtml);

      // 이벤트 리스너 설정
      if (isLoggedIn) {
        document.getElementById('logout-btn').addEventListener('click', () => {
          logout();
        });
      } else {
        document.getElementById('login-btn')?.addEventListener('click', () => login());
        document.getElementById('signup-btn')?.addEventListener('click', () => signup());
      }

      await drawMenuBtnList();
    })
    .catch((err) => {
      console.error('헤더 로딩 실패 : ', err);
    });
}

// 헤더 HTML 생성
async function createHeaderHtml(isLoggedIn, cartsCount) {
  if (isLoggedIn) {
    return `
    <div class="flex flex-col">
      <!-- 최상단 헤더 -->
      <div class="w-full h-5 bg-zinc-800 flex items-center justify-center">
        <div class="w-8/12 relative justify-end inline-flex">
          <div class="h-3.5 flex justify-end items-center gap-1">
            <div id="logout-div" class="justify-center items-center flex">
              <button type="submit" id="logout-btn" class="text-center text-white text-xs font-normal font-['Inter']">로그아웃</button>
            </div>
            <div id="logout-bar" class="w-2 -rotate-90 border border-zinc-500"></div>
            <div id="cart" class="justify-center items-center flex"></div>
              <button class="text-center text-white text-xs font-normal font-['Inter']"><a href="/html/mypage/cart.html">장바구니(${cartsCount})</a></button>
            <div id="cart-bar" class="w-2 -rotate-90 border border-zinc-500"></div>
            <div id="my-page-div" class="justify-center items-center gap-2.5 flex">
              <a href="/html/mypage/myinfo.html" class="text-center text-white text-xs font-normal font-['Inter']">마이페이지</a>
            </div>
            <div id="my-page-bar" class="w-2 -rotate-90 border border-zinc-500"></div>
            <div class="justify-center items-center flex">
              <button class="text-center text-white text-xs font-normal font-['Inter']">홈페이지소개</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  } else {
    return `
      <div class="flex flex-col">
        <!-- 최상단 헤더 -->
        <div class="w-full h-5 bg-zinc-800 flex items-center justify-center">
          <div class="w-8/12 relative justify-end inline-flex">
            <div class="h-3.5 flex justify-end items-center gap-1">
              <div id="signup-div" class="justify-center items-center flex">
                <button type="button" data-modal-target="signup-modal" data-modal-toggle="signup-modal" class="text-center text-white text-xs font-normal font-['Inter']">회원가입</button>
              </div>
              <div id="signup-bar" class="w-2 -rotate-90 border border-zinc-500"></div>
              <div id="login-div" class="justify-center items-center flex">
                <button data-modal-target="login-modal" data-modal-toggle="login-modal" class="text-center text-white text-xs font-normal font-['Inter']">로그인</button>
              </div>
              <div id="login-bar" class="w-2 -rotate-90 border border-zinc-500"></div>
              
              <div class="justify-center items-center flex">
                <button class="text-center text-white text-xs font-normal font-['Inter']">홈페이지소개</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// 메뉴 버튼 목록 그리기
async function drawMenuBtnList() {
  const menuListHtml = `
  <!-- 로고 -->
    <div class="w-full h-44 flex-col justify-center items-center gap-2.5 inline-flex">
      <!-- 로고이미지 -->
      <a href="/" title="main" class="h-24 justify-center items-center gap-2.5 flex">
        <img class="w-64 h-64" src="/sourse/image/gola.png" alt="logo" />
      </a>
      <!-- 사업자전용 미팅 -->
      <div class="w-8/12 h-5 flex">
        <div class="w-24 h-5 flex relative justify-center items-center">
          <a href="/html/seller/non-signup.html" class="w-24 h-5 flex justify-center items-center bg-orange-300 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <div class="w-14 h-4 text-black text-xs font-normal font-['Inter']">사업자전용</div>
          </a>
        </div>
      </div>
    </div>
    <!-- 메뉴 -->
    <div class="w-full justify-center items-center flex flex-col py-2.5 max-md:px-5 border">
      <div class="flex w-8/12 max-w-full justify-between gap-5 items-start max-md:flex-wrap">
        <!-- 고향사랑기부제 메뉴 -->
        <div class="w-full justify-center items-center flex flex-col py-2.5 max-md:px-5">
          <div class="flex w-full max-w-full justify-between gap-5 items-start max-md:flex-wrap">
            <!-- 고향사랑기부제 메뉴 -->
            <button id="menu-dropdown-button" data-dropdown-toggle="menu-dropdown" class="flex justify-end-reverse items-start w-1/5 gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div class="justify-center text-black text-center text-base whitespace-nowrap font-['Inter']">고향사랑기부제</div>
            </button>
            <div id="menu-dropdown" class="hidden w-auto text-sm bg-white border border-gray-100 rounded-lg">
              <div class="p-4">
                <ul class="space-y-4">
                  <li class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <a href="https://lanlanlooo.notion.site/61ef493471c749239a076024c5bd2455?pvs=4" rel="noopener" target="_blank" class="text-gray-500 hover:text-blue-600"> &nbsp;제도안내 </a>
                  </li>
                  <li class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                    <a href="https://lanlanlooo.notion.site/09b27f45086f48fe91ebedb7510b336d?pvs=4" rel="noopener" target="_blank" class="text-gray-500 hover:text-blue-600"> &nbsp;답례품안내 </a>
                  </li>
                  <li class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    <a href="https://www.ilovegohyang.go.kr/main.html" rel="noopener" target="_blank" class="text-gray-500 hover:text-blue-600"> &nbsp;고향사랑이음 </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 사이트메뉴 -->
            <div class="flex justify-center w-3/5 px-5">
              <a href="/" title="all" class="justify-center text-center text-base grow whitespace-nowrap font-['Inter']"> 전체상품 </a>
              <a href="/html/search/search-for-theme.html" title="theme" class="justify-center text-black text-center text-base grow whitespace-nowrap font-['Inter']"> 테마별 </a>
              <a href="/html/search/search-for-category.html" title="category" class="justify-center text-black text-center text-base grow whitespace-nowrap font-['Inter']"> 품목별 </a>
              <a href="/html/search/search-for-region.html" title="region" class="justify-center text-black text-center text-base grow whitespace-nowrap font-['Inter']"> 지역별 </a>
              <a href="#" title="faq" class="justify-center text-black text-center text-base grow whitespace-nowrap font-['Inter']"> FAQ </a>
            </div>
            <!-- 검색창 -->
            <div class="justify-between border w-1/5 flex gap-5 px-5 rounded-2xl border-solid border-zinc-300">
              <input id="search-input" aria-label="검색어를 입력하세요" class="items-stretch border-solid border-zinc-300 w-full" />
              <button type="button" title="search" id="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  $header.insertAdjacentHTML('afterbegin', menuListHtml);
}
