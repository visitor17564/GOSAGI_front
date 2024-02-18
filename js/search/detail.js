import { addToRecentViewed } from '../util/recent-view.js';
import * as productAPI from './detail-product.js';
import * as questionAPI from './detail-question.js';
import * as reviewAPI from './detail-review.js';
import * as countAPI from './detail-count.js';
import * as authAPI from './detail-auth.js';
import * as wishAPI from './detail-wish.js';
import * as cartAPI from './detail-cart-order.js';

document.addEventListener('DOMContentLoaded', async function () {
  // 쿼리 스트링 가져오기
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);
  let productId = parseInt(searchParams.get('productId'));

  // product, reviews, questions 가져오기
  const product = await productAPI.getProduct(productId);
  const reviews = await reviewAPI.getProductReview(productId);
  const questions = await questionAPI.getProductQuestion(productId);

  // 상품후기, 상품문의 스크롤 버튼 만들기
  const productQuestionDivButton = document.getElementById('product-question-div-button');
  productQuestionDivButton.innerText = `상품문의(${questions.length})`;
  const productReviewDivButton = document.getElementById('product-review-div-button');
  productReviewDivButton.innerText = `상품후기(${reviews.review_length})`;
  await productAPI.generateProductCard(product, reviews);

  // 스크롤 활성화
  // 상품 문의 누르면 상품 문의로 스크롤이동
  productQuestionDivButton.addEventListener('click', function () {
    document.getElementById('product-question').scrollIntoView({ behavior: 'smooth' });
  });
  // 상품 후기 누르면 상품 문의로 스크롤이동
  productReviewDivButton.addEventListener('click', function () {
    document.getElementById('product-review').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('go-to-first').addEventListener('click', function () {
    window.scrollTo(0, 0, { behavior: 'smooth' });
  });

  // 상품 카운트 활성화
  await countAPI.quantityBtn();
  await addToRecentViewed(product.id, product.thumbnail_image);

  // 유저정보 불러오기
  const userId = await authAPI.getUserId();

  // 찜하기 불러오기
  const $wishDiv = document.getElementById('wish-div');
  const wishCount = await wishAPI.getProductWishCount(productId);
  if (userId) {
    const wishCheck = await wishAPI.checkIsMyWish(productId);
    await wishAPI.generateProductWish(wishCount, wishCheck);
  } else {
    const wishCheck = {
      isMyWish: false,
      myWishId: 0,
    };
    await wishAPI.generateProductWish(wishCount, wishCheck);
  }

  // 찜하기 동작버튼 리스너 추가
  $wishDiv.addEventListener('click', function () {
    wishAPI.changeWish(userId, wishCount, productId);
  });

  // 장바구니담기 동작 리스너 추가
  cartAPI.addCartButton.addEventListener('click', async () => {
    cartAPI.createCart(userId, productId);
  });

  // 바로 구매 동작 리스너 추가
  cartAPI.purchaseButton.addEventListener('click', function () {
    cartAPI.drawCart(userId);
  });

  // 토스 결제 버튼 클릭 이벤트
  cartAPI.paymentBtn.addEventListener('click', function () {
    cartAPI.paymentToss(productId);
  });

  // 상품 리뷰 불러오기
  await reviewAPI.generateProductReviews(reviews);

  // 상품 문의내역 불러오기
  await questionAPI.generateProductQuestions(questions, userId);

  // 문의 남기기
  const $productQuestionButton = document.getElementById('product-question-button');
  $productQuestionButton.addEventListener('click', async () => {
    console.log(userId);
    if (userId) {
      questionAPI.addQuestion(userId, productId);
    } else {
      alert('로그인이 필요합니다.');
      location.reload();
    }
  });
});
