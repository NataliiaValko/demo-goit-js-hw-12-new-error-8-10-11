import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31000801-179358ed9db1a9fc0904af43d';

export async function getImagesByQuery({ query, page }) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
    page: page,
    per_page: 15,
  });

  const { data } = await axios(`${BASE_URL}?${params}`);
  return data;
}
