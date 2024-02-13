// DOM 요소들
const questionDiv = document.getElementById('question-wrap');

const $questionType = document.getElementById('question-type');
const $questionTitle = document.getElementById('question-title');
const $questionContent = document.getElementById('question-content');
const $secret = document.getElementById('secret');
const $answerContent = document.getElementById('answer-content');

const $questionModalAnswer = document.getElementById('question-modal-answer');

const $addAnswerButton = document.getElementById('add-answer-button');

let page = 1;

document.addEventListener('DOMContentLoaded', async function () {
  const storeId = await getStoreId();
  await drawQuestionList(storeId);
  await drawSelectQuestion();
});

// 문의 목록 그리기
async function drawQuestionList(storeId) {
  try {
    // 문의 목록 조회 API 실행
    const response = await axios.get(`https://back.gosagi.com/question/storeList/${storeId}`, {
      withCredentials: true,
    });
    const questions = response.data.data;
    questionDiv.innerHTML = questions.length ? '' : '<div>문의 내역이 존재하지 않습니다</div>';
    questions.forEach((question) => {
      const category = question.question.product_id < 3 ? '이용문의' : '상품문의';
      const waitAnswer = question.status === '답변대기' ? '' : 'hidden ';
      const completeAnswer = question.status === '답변대기' ? 'hidden ' : '';
      let isPrivate = '';
      if (question.question.is_private === false) {
        isPrivate = 'hidden';
      }

      let tempHtml = `
      <tr id='${question.question.id}' class="bg-white border-b">
        <td scope="row" class="px-6 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">${category}</td>
        <td class="flex justify-center py-6 font-['Inter']">
          <div class="${isPrivate}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg> 
          </div>
          &emsp;${question.question.title}
        </td>
        <td class="px-6 py-4 font-['Inter'] text-center">${question.question.created_at.slice(0, 10)}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
          <button question-detail-btn data-modal-target="question-modal" data-modal-toggle="question-modal" class="${completeAnswer}h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변완료</button>
          <button class="${waitAnswer}h-5 w-1/2 justify-center  border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">답변대기중</button>
          <button question-detail-btn data-modal-target="question-modal" data-modal-toggle="question-modal" class="${waitAnswer}h-5 w-1/2 justify-center hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">상세보기</button>
        </td>
      </tr>`;

      questionDiv.insertAdjacentHTML('beforeend', tempHtml);
    });

    drawSelectQuestion();
  } catch (err) {
    console.log('err: ', err);
  }
}

// 문의 글 상세 조회
async function drawSelectQuestion() {
  const $questionBtns = document.querySelectorAll('[question-detail-btn]');

  $questionBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const questionId = currentRow.id;

      try {
        // 문의 글 상세 조회 API 실행
        const response = await axios.get(`https://back.gosagi.com/question/detail/${questionId}`, {
          withCredentials: true,
        });

        const question = response.data.data;
        $secret.checked = question.question.is_private;
        $questionTitle.value = question.question.title;
        $questionContent.value = question.question.content;
        $questionType.innerText = question.question.product_id < 3 ? '이용문의' : '상품문의';

        if (!question.answer) {
          $addAnswerButton.innerText = '답변달기';
          $questionTitle.disabled = true;
          $questionContent.disabled = true;
          $answerContent.value = '';
        } else {
          $addAnswerButton.innerText = '답변삭제';
          $questionTitle.disabled = true;
          $questionContent.disabled = true;
          $answerContent.value = question.answer.content;

          $questionContent.disabled = true;
        }

        $addAnswerButton.onclick = () => {
          if ($addAnswerButton.innerText === '답변달기') {
            addAnswer(questionId);
          } else {
            const answerId = question.answer.id;
            deleteAnswer(answerId);
          }
        };
      } catch (err) {
        console.log(err);
      }
    });
  });
}

// 답글달기
async function addAnswer(questionId) {
  try {
    // 문의 글 수정 API 실행
    const response = await axios.post(
      `https://back.gosagi.com/answer/${questionId}`,
      {
        content: $answerContent.value,
      },
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);
    window.location.reload();
  } catch (err) {
    alert(err.response.data.message);
  }
}

async function deleteAnswer(questionId) {
  try {
    // 문의 글 수정 API 실행
    const response = await axios.delete(`https://back.gosagi.com/answer/${questionId}`, {
      withCredentials: true,
    });

    alert(response.data.message);
    window.location.reload();
  } catch (err) {
    alert(err.response.data.message);
  }
}

async function getStoreId() {
  try {
    // 회원정보 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/user', {
      withCredentials: true,
    });
    const storeId = response.data.data[0].store[0].id;
    return storeId;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}
