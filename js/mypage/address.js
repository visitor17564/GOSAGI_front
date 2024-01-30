async function drawAddressList() {
  const addressWrapDiv = document.getElementById('address-wrap');
  try {
    // 리뷰 조회 API 실행
    const response = await axios.get('http://localhost:3000/address/myAddress', {
      withCredentials: true,
    });

    const addresses = response.data.data;
    if (addresses.length >= 1) {
      addressWrapDiv.innerHTML = '';
      addresses.forEach((address) => {
        let tempHtml = `<tr class="bg-white border-b">
        <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap font-['Inter']">
          <p>${address.address_name}</p>
        </th>
        <td class="px-6 py-4 font-['Inter'] text-center">${address.name}</td>
        <td class="px-6 py-4 font-['Inter'] text-center">${address.name}${address.detail_address}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">${address.phone}</td>
        <td class="text-center px-6 py-3 gap-2 flex flex-col justify-center items-center">
          <button id="fixAddress:${address.id}" data-modal-target="fix-address-modal" data-modal-toggle="fix-address-modal" class="h-5 w-10 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">수정</button>
          <button id="deleteAddress:${address.id}" class="h-5 w-10 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">삭제</button>
        </td>
      </tr>`;
        addressWrapDiv.insertAdjacentHTML('beforeend', tempHtml);
      });
    }
    if (addresses.length === 0) {
      let tempHtml = '<div>문의 내역이 존재하지 않습니다</div>';
      addressWrapDiv.insertAdjacentHTML('beforeend', tempHtml);
    }
  } catch (err) {
    console.log('err: ', err);
    // alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}

drawAddressList();

const addressSearchBtn = document.getElementById('address-search-btn');
const addAddressButton = document.getElementById('add-address-button');

// 주소 검색
addressSearchBtn.addEventListener('click', () => {
  const address = document.getElementById('address');
  const addressDetail = document.getElementById('detail-address');
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        addressDetail.value = extraAddr;
      } else {
        addressDetail.value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postcode.value = data.zonecode;
      address.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      addressDetail.focus();
    },
  }).open();
});

addAddressButton.addEventListener('click', async () => {
  const address_name = document.getElementById('address-name').value;
  const name = document.getElementById('address-recipient').value;
  const phone = document.getElementById('address-phone-number').value;
  const post_code = document.getElementById('postcode').value;
  const address = document.getElementById('address').value;
  const detail_address = document.getElementById('detail-address').value;
  addAddress(address_name, name, phone, post_code, address, detail_address);
});

async function addAddress(address_name, name, phone, post_code, address, detail_address) {
  try {
    await axios.post(
      'http://localhost:3000/address',
      {
        address_name,
        name,
        phone,
        post_code,
        address,
        detail_address,
      },
      {
        withCredentials: true,
      },
    );
    alert('배송지 등록 성공');
    window.location.reload();
  } catch (err) {
    console.log('err: ', err);
  }
}

let addressId = 0;

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let modalClicked = String(clickedElementId).includes('fixAddress') || String(clickedElementId).includes('deleteAddress');
  if (modalClicked) {
    addressId = Number(String(clickedElementId).split(':')[1]);
  }
  if (String(clickedElementId).includes('deleteAddress')) {
    deleteAddress(addressId);
  }
  if (String(clickedElementId).includes('fixAddress')) {
    try {
      const address = await axios.get(`http://localhost:3000/address/myAddress/${addressId}`, {
        withCredentials: true,
      });
      console.log(address.data.data);

      document.getElementById('fix-address-name').value = address.data.data.address_name;
      document.getElementById('fix-address-recipient').value = address.data.data.name;
      document.getElementById('fix-address-phone-number').value = address.data.data.phone;
      document.getElementById('fix-postcode').value = address.data.data.post_code;
      document.getElementById('fix-address').value = address.data.data.address;
      document.getElementById('fix-detail-address').value = address.data.data.detail_address;
    } catch (err) { }
  }
});

const addressFixButton = document.getElementById('fix-add-address-button');
addressFixButton.addEventListener('click', async () => {
  const address_name = document.getElementById('fix-address-name').value;
  const name = document.getElementById('fix-address-recipient').value;
  const phone = document.getElementById('fix-address-phone-number').value;
  const post_code = document.getElementById('fix-postcode').value;
  const address = document.getElementById('fix-address').value;
  const detail_address = document.getElementById('fix-detail-address').value;
  fixAddress(address_name, name, phone, post_code, address, detail_address);
});

async function fixAddress(address_name, name, phone, post_code, address, detail_address) {
  try {
    await axios.patch(
      `http://localhost:3000/address/myAddress/${addressId}`,
      {
        address_name,
        name,
        phone,
        post_code,
        address,
        detail_address,
      },
      {
        withCredentials: true,
      },
    );
    alert('배송지 수정 성공');
    window.location.reload();
  } catch (err) {
    console.log('err: ', err);
  }
}

async function deleteAddress(addressId) {
  try {
    await axios.delete(`http://localhost:3000/address/myAddress/${addressId}`, {
      withCredentials: true,
    });
    alert('주소가 삭제되었습니다.');
    window.location.reload();
  } catch (err) { }
}
