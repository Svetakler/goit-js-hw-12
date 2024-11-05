const API_KEY = '46856425-450f7e6938fc07d9efbff3295';
const BASE_URL = 'https://pixabay.com/api/';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default async function fetchImages(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perPage,
  });

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching images.');
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return [];
    }

    return data;
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Error fetching images. Try again!',
    });
    console.error('Error fetching images:', error);
    return [];
  }
}
