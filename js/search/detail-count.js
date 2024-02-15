export const countDiv = document.getElementById('count-div');
export const countProductName = document.getElementById('count-product-name');

export async function quantityBtn() {
  const quantity = document.getElementById('quantity');
  const quantityDecreaseBtn = document.getElementById('quantity-decrease-btn');
  const quantityIncrementBtn = document.getElementById('quantity-increment-btn');
  const productPrice = document.getElementById('product-price');
  const productTotalPrice = document.getElementById('product-total-price');

  // 수량 증가 버튼
  quantityIncrementBtn.addEventListener('click', function () {
    const currentQuantity = Number(quantity.value);
    quantity.value = currentQuantity + 1;

    productTotalPrice.innerText = Number(quantity.value * productPrice.innerText.replace(/,/g, '')).toLocaleString('ko-KR');
  });

  // 수량 감소 버튼
  quantityDecreaseBtn.addEventListener('click', function () {
    const currentQuantity = Number(quantity.value);
    if (currentQuantity > 1) {
      quantity.value = currentQuantity - 1;

      productTotalPrice.innerText = Number(quantity.value * productPrice.innerText.replace(/,/g, '')).toLocaleString('ko-KR');
    }
  });
}
