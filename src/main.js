import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  scrollWindow,
  showLoader,
  toggleLoadMoreBtn,
  updateGallery,
} from './js/render-functions';

const formEl = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;

async function handleSubmit(event) {
  event.preventDefault();

  query = event.target.elements.message.value.trim();
  event.target.reset();

  if (query === '') {
    return;
  }

  showLoader();
  toggleLoadMoreBtn({});
  clearGallery();
  page = 1;

  try {
    const { hits, totalHits } = await getImagesByQuery({ query, page });

    if (hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);
    toggleLoadMoreBtn({ totalHits, page });
    if (totalHits <= page * 15) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();
  toggleLoadMoreBtn({});
  try {
    const { hits, totalHits } = await getImagesByQuery({ query, page });

    if (hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      toggleLoadMoreBtn({ totalHits, page });
      return;
    }

    updateGallery(hits);
    scrollWindow();
    toggleLoadMoreBtn({ totalHits, page });
    if (totalHits <= page * 15) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } finally {
    hideLoader();
  }
}

formEl.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
