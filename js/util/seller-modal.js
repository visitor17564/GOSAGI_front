const $sellerSearchButton = document.getElementById('seller-search-button');
$sellerSearchButton.addEventListener('click', () => {
  const $sellerNumber = document.getElementById('search-input');
  const sellerNumber = $sellerNumber.value.split('-').join('');
  drawSellerList(sellerNumber);
});

async function drawSellerList(sellerNumber) {
  const $sellerWrapDiv = document.getElementById('seller-wrap');
  try {
    // 리뷰 조회 API 실행
    const response = await fetch(`https://apis.data.go.kr/1130000/MllBsDtl_1Service/getMllBsInfoDetail_1?serviceKey=llah%2Fg1QU0M6poqTpD7RIPQ0AWBU%2Bq6ZPGPHprILepwZ2FOz3qQnTdKiy3e%2BDaRWEbpCnnVCKWOgtYmAzgbbtA%3D%3D&pageNo=1&numOfRows=1&brno=${sellerNumber}`);
    let t_xml = await response.text(); // 텍스트 형태로 가져오고
    // 자바스크립트로 다루기위해, 파서를 통해 텍스트를 xml문서로 변환한다.
    let parseXML = new DOMParser();
    let xmlDoc = parseXML.parseFromString(t_xml, 'text/xml');
    const numberOfRows = xmlDoc.getElementsByTagName('numOfRows')[0].textContent;
    const address = xmlDoc.getElementsByTagName('rnAddr')[0].textContent;
    const number = xmlDoc.getElementsByTagName('brno')[0].textContent;
    const name = xmlDoc.getElementsByTagName('bzmnNm')[0].textContent;
    if (numberOfRows >= 1) {
      $sellerWrapDiv.innerHTML = `<tr class="bg-white border-b">
        <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
          <p id="seller-name">${name}</p>
        </th>
        <td id="seller-number" class="px-6 py-4 font-['Inter'] text-center">${number}</td>
        <td id="seller-address" class="px-6 py-4 font-['Inter'] text-center">${address}</td>
        <td class="text-center px-6 py-3 gap-2 flex flex-col justify-center items-center">
          <button id="chooseSeller" data-modal-target="fix-address-modal" data-modal-toggle="fix-address-modal" class="h-5 w-10 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">선택</button>
        </td>
      </tr>`;
    }
    if (numberOfRows === 0) {
      $sellerWrapDiv.innerHTML = '<div>사업자가 존재하지 않습니다.</div>';
    }
  } catch (err) {
    console.log(err);
    alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}

let addressId;

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let modalClicked = String(clickedElementId).includes('chooseSeller');
  if (modalClicked) {
    const name = document.getElementById('seller-name').textContent;
    const number = document.getElementById('seller-number').textContent;
    const address = document.getElementById('seller-address').textContent;
    window.opener.document.getElementById('seller-name').value = name;
    window.opener.document.getElementById('seller-number').value = number;
    window.opener.document.getElementById('seller-address').value = address;
    window.close();
  }
});
