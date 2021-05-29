import galleryItems from './gallery-items.js';

const imagesGalleryList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const close = document.querySelector('.lightbox__button');

const arrayGalleryImages = [];

const makeGalleryItem = ({preview, original, description})  => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt=${description}
    />
  </a>
</li>`;
};
const makeGallery = galleryItems.map(makeGalleryItem).join('');
imagesGalleryList.insertAdjacentHTML('beforeend', makeGallery);

imagesGalleryList.addEventListener('click', onImagesGalleryOpen);

function onImagesGalleryOpen(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  };
  lightbox.classList.add('is-open');
  lightboxImage.setAttribute('src', e.target.dataset.source);
  lightboxImage.setAttribute('alt', e.target.alt);
  window.addEventListener('keydown', onEscKeyPress);
};

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseLightbox();
}
}

const images = document.querySelectorAll('.gallery__image');

images.forEach(el => {
  arrayGalleryImages.push(el.getAttribute('data-source'));
});

const onCloseLightbox = () => {
  window.removeEventListener('keydown', onEscKeyPress);
  lightbox.classList.remove('is-open');
  lightboxImage.setAttribute('src', ' ');
  lightboxImage.setAttribute('alt', ' ');
};

close.addEventListener('click', onCloseLightbox);

document.addEventListener('keydown', e => {
  let newIndex;
  const currentId = arrayGalleryImages.indexOf(lightboxImage.src);
  if (e.key === 'ArrowLeft') {
    newIndex = currentId - 1;
    if (newIndex === -1) {
      newIndex = arrayGalleryImages.length - 1;
    }
  } else if (e.key === 'ArrowRight') {
    newIndex = currentId + 1;
    if (newIndex === arrayGalleryImages.length) {
      newIndex = 0;
    }
  }
  lightboxImage.src = arrayGalleryImages[newIndex];
});

lightboxOverlay.addEventListener('click', onLightboxOverlayClick);

function onLightboxOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseLightbox();
}
};
