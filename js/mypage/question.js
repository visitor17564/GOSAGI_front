// DOM 요소들
const questionDiv = document.getElementById('question-wrap');
const questionModalDiv = document.getElementById('question-modal-wrap');

const $questionWriteBtn = document.getElementById('question-write-btn');
const $questionType = document.getElementById('question-type');
const $questionTitle = document.getElementById('question-title');
const $questionContent = document.getElementById('question-content');
const $secret = document.getElementById('secret');
const $answerContent = document.getElementById('answer-content');

const $questionModalAnswer = document.getElementById('question-modal-answer');

const $fixQuestionButton = document.getElementById('fix-question-button');
const $deleteQuestionButton = document.getElementById('delete-question-button');

// 문의 목록 그리기
async function drawQuestionList() {
  try {
    // 문의 목록 조회 API 실행
    const response = await axios.get('http://52.79.88.29:3000/question/myList', {
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

drawQuestionList();

// 문의 글 상세 조회
async function drawSelectQuestion() {
  const $questionBtns = document.querySelectorAll('[question-detail-btn]');

  $questionBtns.forEach((button) => {
    button.addEventListener('click', async function () {
      const currentRow = button.closest('tr');
      const questionId = currentRow.id;

      try {
        // 문의 글 상세 조회 API 실행
        const response = await axios.get(`http://52.79.88.29:3000/question/detail/${questionId}`, {
          withCredentials: true,
        });

        const question = response.data.data;
        $secret.checked = question.question.is_private;
        $questionTitle.value = question.question.title;
        $questionContent.value = question.question.content;
        $questionType.innerText = question.question.product_id < 3 ? '이용문의' : '상품문의';

        if (!question.answer) {
          $questionModalAnswer.classList.add('hidden');
          $fixQuestionButton.classList.remove('hidden');
          $questionTitle.disabled = false;
          $questionContent.disabled = false;
          $answerContent.value = '';
        } else {
          $questionModalAnswer.classList.remove('hidden');
          $fixQuestionButton.classList.add('hidden');
          $questionTitle.disabled = true;
          $questionContent.disabled = true;
          $answerContent.value = question.answer.content;
        }

        $deleteQuestionButton.onclick = () => deleteQuestion(questionId, question.question.title, question.question.content);
        $fixQuestionButton.onclick = () => editQuestion(questionId);
      } catch (err) {
        console.log(err);
      }
    });
  });
}

$questionWriteBtn.addEventListener('click', function () {
  createQuestion();
});

// 문의 글 저장
export async function createQuestion() {
  const $questionWriteTitle = document.getElementById('question-write-title');
  const $questionWriteContent = document.getElementById('question-write-content');
  const $terms = document.getElementById('terms');
  try {
    // 문의 글 저장 API 실행
    const response = await axios.post(
      `http://52.79.88.29:3000/question`,
      {
        isPrivate: $terms.checked,
        productId: 1,
        title: $questionWriteTitle.value,
        content: $questionWriteContent.value,
      },
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);
    drawQuestionList();
  } catch (err) {
    alert(err.response.data.message);
  }
}

// 문의 글 삭제
async function deleteQuestion(questionId, title, content) {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      // 문의 글 삭제(수정) API 실행
      const response = await axios.patch(
        `http://52.79.88.29:3000/question/${questionId}`,
        {
          isDeleted: true,
          title,
          content,
        },
        {
          withCredentials: true,
        },
      );

      alert(response.data.message);
      // document.getElementById(`${questionId}`).remove();
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
    }
  }
}

// 문의 글 수정
async function editQuestion(questionId) {
  const $secret = document.getElementById('secret');
  try {
    // 문의 글 수정 API 실행
    const response = await axios.patch(
      `http://52.79.88.29:3000/question/${questionId}`,
      {
        isDeleted: false,
        title: $questionTitle.value,
        content: $questionContent.value,
        isPrivate: $secret.checked,
      },
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);
    // const currentRow = document.getElementById(`${questionId}`);
    // currentRow.querySelector('[question-list-title]').innerText = $questionTitle.value;
    window.location.reload();
  } catch (err) {
    alert(err.response.data.message);
  }
}
