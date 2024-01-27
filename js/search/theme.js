import { searchProduct } from './search.js';
import { generateProductCards } from '../main.js';

const mostView = document.getElementById('most-view');
const mostWish = document.getElementById('most-wish');
const popular = document.getElementById('popular');
const mostPurchase = document.getElementById('most-purchase');
const mostRate = document.getElementById('most-rate');

export async function getMostView() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`http://localhost:3000/goods/views`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostView);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function getMostWish() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`http://localhost:3000/goods/wishes`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostWish);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function getPopular() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`http://localhost:3000/goods/bestProducts`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, popular);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function getMostPurchase() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`http://localhost:3000/goods/bestProducts`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostPurchase);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

export async function getMostRate() {
  try {
    // axios를 사용하여 로그인 API 실행

    const response = await axios.get(`http://localhost:3000/goods/bestProducts`, { withCredentials: true });
    const products = response.data.data;
    generateProductCards(products, mostRate);
  } catch (err) {
    // 오류 처리
    alert('오류발생: ' + err);
  }
}

getMostView();
getMostWish();
getPopular();
getMostPurchase();
getMostRate();
