export { resetDomMarkup, domMarkup };
const gallery = document.querySelector('.gallery');

function markupGallery(fetchedData) {
  return fetchedData
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` 
<li class="thumb"> 
    <a href="${largeImageURL}" 
            class="gallery-item" > 
    <div class="photo-card"> 
            <img src="${webformatURL}" alt="${tags}"  loading="lazy" 
            class="gallery-image"/> 
        <div class="info"> 
            <p class="info-item"> 
            <b>Likes</b>${likes} 
            </p> 
            <p class="info-item"> 
            <b>Views</b>${views} 
            </p> 
            <p class="info-item"> 
            <b>Comments</b>${comments} 
            </p> 
            <p class="info-item"> 
            <b>Downloads</b>${downloads} 
            </p> 
         </div> 
    </div> 
    </a> 
</li>`;
      }
    )
    .join('');
}

function resetDomMarkup() {
  gallery.innerHTML = '';
}

function domMarkup(resp) {
  gallery.insertAdjacentHTML('beforeend', markupGallery(resp));
}
