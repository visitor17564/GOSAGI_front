const previousBtn = document.getElementById('previous-button');
const nextBtn = document.getElementById('next-button');
const COUNT_PER_PAGE = 12;

export async function setPageButtons(pageGroup, url) {
  const numberButtonWrapper = document.getElementById('page-button-wrap');
  numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
  // 1페이지면 '이전'버튼 삭제, 아닐때는 다시 생김
  if (pageGroup === 1) {
    previousBtn.hidden = true;
  } else {
    previousBtn.hidden = false;
  }

  // 총 페이지를 세서 페이지카운트 확인
  const count = await getTotalPageCount(COUNT_PER_PAGE, url);
  if (count >= 10) {
    if (count >= 10 * pageGroup) {
      for (let i = 1 + 10 * (pageGroup - 1); i <= 10 * pageGroup; i++) {
        numberButtonWrapper.innerHTML += `<button id="clicked-page-button:${i}" type="button" class="number-button mx-3 hover:text-red-300 focus:text-red-300 "> ${i} </button>`;
        nextBtn.hidden = false;
      }
    } else {
      nextBtn.hidden = true;
      for (let i = 1 + 10 * (pageGroup - 1); i <= count; i++) {
        numberButtonWrapper.innerHTML += `<button id="clicked-page-button:${i}" type="button" class="number-button mx-3 hover:text-red-300 focus:text-red-300 "> ${i} </button>`;
      }
    }
  } else {
    previousBtn.hidden = true;
    nextBtn.hidden = true;
    for (let i = 1 + 10 * (pageGroup - 1); i <= count; i++) {
      numberButtonWrapper.innerHTML += `<button id="clicked-page-button:${i}" type="button" class="number-button mx-3 hover:text-red-300 focus:text-red-300 "> ${i} </button>`;
    }
  }
}

export async function getTotalPageCount(COUNT_PER_PAGE, url) {
  try {
    // axios를 사용하여 전체 상품 개수 확인
    const response = await axios.get(`${url}`);
    return Math.ceil(response.data.data / COUNT_PER_PAGE);
  } catch (err) {
    // 오류 처리
    console.log(err);
    alert('오류발생: ' + err.response.data.message);
  }
}
