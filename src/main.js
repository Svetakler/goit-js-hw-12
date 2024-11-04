import { resetDomMarkup, domMarkup } from './js/render-functions';
import fetchImages from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.classList.add('btn', 'load-more');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

let query = '';
let currentPage = 1;
const perPage = 15;

let instance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', loadMoreImages);

function onSubmitForm(evt) {
  evt.preventDefault();

  query = evt.currentTarget.searchQuery.value.trim();

  if (query === '') {
    return iziToast.info({
      position: 'topRight',
      title: 'Sorry',
      message: 'Please, type what you want to search!',
    });
  }

  resetDomMarkup();
  currentPage = 1;
  showLoader();
  loadMoreBtn.style.display = 'none';

  fetchImages(query, currentPage, perPage)
    .then(resp => {
      if (resp.length === 0) {
        iziToast.warning({
          position: 'topRight',
          title: 'No Results',
          message: 'No images found for your search. Try another query!',
        });
        return;
      }

      domMarkup(resp);
      instance.refresh();
      loadMoreBtn.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Something went wrong while fetching images. Please try again later!',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function loadMoreImages() {
  currentPage += 1;
  showLoader();

  fetchImages(query, currentPage, perPage)
    .then(resp => {
      if (resp.length === 0) {
        iziToast.info({
          position: 'topRight',
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreBtn.style.display = 'none';
        return;
      }

      domMarkup(resp);
      instance.refresh();

      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Something went wrong while fetching images. Please try again later!',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
