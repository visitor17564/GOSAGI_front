async function drawAddressList() {
  const addressWrapDiv = document.getElementById('address-wrap');
  try {
    // 리뷰 조회 API 실행
    const response = await axios.get('https://back.gosagi.com/address/myAddress', {
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
        <td class="px-6 py-4 font-['Inter'] text-center">${address.address}${address.detail_address}</td>
        <td class="w-1/5 px-6 py-4 font-['Inter'] text-center flex-col justify-center items-center">${address.phone}</td>
        <td class="text-center px-6 py-3 gap-2 flex flex-col justify-center items-center">
          <button id="chooseAddress:${address.id}" data-modal-target="fix-address-modal" data-modal-toggle="fix-address-modal" class="h-5 w-10 hover:bg-gray-400 hover:text-white border border-gray-400 text-gray-400 text-center bg-white items-center rounded-lg max-md:max-w-full max-md:px-5 font-['Inter']">선택</button>
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
    console.log(err);
    alert(`에러가 발생했습니다. 상세 내용은 관리에게 문의 바랍니다.`);
  }
}

drawAddressList();

let addressId;

document.addEventListener('click', async () => {
  let clickedElementId = event.target.id;
  let modalClicked = String(clickedElementId).includes('chooseAddress');
  if (modalClicked) {
    addressId = Number(String(clickedElementId).split(':')[1]);
    const address = await axios.get(`https://back.gosagi.com/address/myAddress/${addressId}`, {
      withCredentials: true,
    });
    window.opener.document.getElementById('cart-modal-receiver').value = address.data.data.name;
    window.opener.document.getElementById('cart-modal-phone-number').value = address.data.data.phone;
    window.opener.document.getElementById('postcode').value = address.data.data.post_code;
    window.opener.document.getElementById('address').value = address.data.data.address;
    window.opener.document.getElementById('address-detail').value = address.data.data.detail_address;
    window.close();
  }
});
