import { searchProduct } from './search.js';
import { generateProductCards } from '../main-product.js';

const mostView = document.getElementById('most-view');
const mostWish = document.getElementById('most-wish');
const popular = document.getElementById('popular');
const mostPurchase = document.getElementById('most-purchase');
const mostRate = document.getElementById('most-rate');

export async function getMostView() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`https://back.gosagi.com/goods/views`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostView);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export async function getMostWish() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`https://back.gosagi.com/goods/wishes`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostWish);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export async function getPopular() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`https://back.gosagi.com/goods/bestProducts`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, popular);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export async function getMostPurchase() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`https://back.gosagi.com/goods/bestOrders`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostPurchase);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

export async function getMostRate() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`https://back.gosagi.com/goods/reviewRate`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostRate);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err.response.data.message);
  }
}

getMostView();
getMostWish();
getPopular();
getMostPurchase();
getMostRate();
