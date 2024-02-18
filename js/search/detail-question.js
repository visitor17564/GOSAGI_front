import * as modalAPI from './detail-modal.js';

// 문의 글 저장

export async function addQuestion(userId, productId) {
  if (userId) {
    const title = document.getElementById('question-title').value;
    const content = document.getElementById('question-content').value;
    const isPrivate = document.getElementById('secret').checked;
    try {
      await axios.post(
        `https://back.gosagi.com/question`,
        {
          productId,
          title,
          content,
          isPrivate,
        },
        { withCredentials: true },
      );
      alert('문의글 등록 성공');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  } else {
    alert('로그인 후 이용해주세요.');
  }
}

// 문의 글 조회
// 문의 글 상세 조회
export async function drawSelectQuestion() {
  const $questionBtns = document.querySelectorAll('[question-detail-btn]');
  const $answerContent = document.getElementById('answer-content');
  const $questionViewModalAnswer = document.getElementById('question-view-modal-answer');
  const $questionViewTitle = document.getElementById('question-view-title');
  const $questionViewContent = document.getElementById('question-view-content');

  $questionBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      modalAPI.openModal('question-view-modal');
      const currentRow = button.closest('tr');
      const questionId = currentRow.id;

      try {
        // 문의 글 상세 조회 API 실행
        const response = await axios.get(`https://back.gosagi.com/question/detail/${questionId}`, {
          withCredentials: true,
        });

        const question = response.data.data;
        $questionViewTitle.value = question.question.title;
        $questionViewContent.value = question.question.content;

        if (!question.answer) {
          $questionViewModalAnswer.classList.add('hidden');

          $answerContent.value = '';
        } else {
          $questionViewModalAnswer.classList.remove('hidden');

          $answerContent.value = question.answer.content;
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}

export const generateProductQuestions = async (questions, userId) => {
  const $productQuestionTable = document.getElementById('product-question-table');
  if (questions.length === 0) {
    return;
  }
  for (let i = 0; i < questions.length; i++) {
    questions[i].number = i + 1;
  }
  if (userId) {
    $productQuestionTable.innerHTML = questions
      .map((question) => {
        const isPrivate = question.question.is_private === true ? ',' : 'hidden';

        let questionBtnHtml;
        // 답변 전일때
        if (question.status === '답변대기') {
          // 버튼이 있는경우 : 비밀글이고 내 글이거나 비밀글이 아닐 때
          if ((question.question.is_private === true && userId === question.question.user_id) || question.question.is_private === false) {
            questionBtnHtml = `<button question-detail-btn class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변대기</button>`;
          }
          // 비밀글이고 내 글이 아닐 때
          if (question.question.is_private === true && userId !== question.question.user_id) {
            questionBtnHtml = `<button class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">비밀글</button>`;
          }
        }

        // 답변 후일때
        if (question.status !== '답변대기') {
          // 비밀글이고 내 글이거나 비밀글이 아닐 때
          if ((question.question.is_private === true && userId == question.question.user_id) || question.question.is_private === false) {
            questionBtnHtml = `<button question-detail-btn class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white text-xs border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변완료</button>`;
          }
          // 비밀글이고 내 글이 아닐 때
          if (question.question.is_private === true && userId != question.question.user_id) {
            questionBtnHtml = `<button class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">비밀글</button>`;
          }
        }

        return `
      <tr id="${question.question.id}" class="bg-white border-b ">
        <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">${question.number}</th>
        <td class="flex justify-center items-center px-6 py-4 font-['Inter'] text-center">\
        <div class="${isPrivate}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>  
        </div>
        <div>&nbsp;&nbsp;${question.question.title}</div>
        </td>
        <td class="px-6 py-4 font-['Inter'] text-center">${question.question.user.nickname}</td>
        <td class="px-6 py-4 font-['Inter'] text-center">${question.question.created_at.slice(0, 10)}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
          ${questionBtnHtml}
          </td>
      </tr>`;
      })
      .join('');
    drawSelectQuestion();
  } else {
    $productQuestionTable.innerHTML = questions
      .map((question) => {
        const isPrivate = question.question.is_private === true ? ',' : 'hidden';

        let questionBtnHtml;
        // 답변 전일때
        if (question.status === '답변대기') {
          // 비밀글이 아닐 때
          if (question.question.is_private === false) {
            questionBtnHtml = `<button question-detail-btn class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변대기</button>`;
          }
          // 비밀글일 때
          if (question.question.is_private === true) {
            questionBtnHtml = `<button class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">비밀글</button>`;
          }
        }

        // 답변 후일때
        if (question.status !== '답변대기') {
          // 비밀글이 아닐 때
          if (question.question.is_private === false) {
            questionBtnHtml = `<button question-detail-btn class="h-5 w-1/2 justify-center hover:bg-orange-400 hover:text-white text-xs border border-orange-400 text-orange-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">답변완료</button>`;
          }
          // 비밀글일때
          if (question.question.is_private === true) {
            questionBtnHtml = `<button class="h-5 w-1/2 justify-center text-xs border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']" style="cursor: default;">비밀글</button>`;
          }
        }

        return `
    <tr id="${question.question.id}" class="bg-white border-b ">
      <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">${question.number}</th>
      <td class="flex justify-center items-center px-6 py-4 font-['Inter'] text-center">\
      <div class="${isPrivate}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>  
      </div>
      <div>&nbsp;&nbsp;${question.question.title}</div>
      </td>
      <td class="px-6 py-4 font-['Inter'] text-center">${question.question.user.nickname}</td>
      <td class="px-6 py-4 font-['Inter'] text-center">${question.question.created_at.slice(0, 10)}</td>
      <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">
        ${questionBtnHtml}
        </td>
    </tr>`;
      })
      .join('');
    drawSelectQuestion();
  }
};

export async function getProductQuestion(productId) {
  try {
    // axios를 사용하여 로그인 API 실행
    const questions = await axios.get(`https://back.gosagi.com/question/productList/${productId}`, { withCredentials: true });
    return questions.data.data;
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}
