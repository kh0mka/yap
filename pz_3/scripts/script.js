const MAIN_SLIDER_TYPE = 1;
const REVIEWS_SLIDER_TYPE = 2;

let mainSliderPosition = 0;
let reviewsSliderPosition = 0;

const countMainSliderWidth = () => document.querySelector('#main-slider .slider-container').clientWidth;
const countReviewsSliderWidth = () => document.querySelector('#review .slider-container').clientWidth;

const mainSliderTrack = document.querySelector('#main-slider .slider-track');
const reviewsSliderTrack = document.querySelector('#review .slider-track');

const mainSliderNextButton = document.querySelector('#main-slider .btn-next');
const mainSliderPreviousButton = document.querySelector('#main-slider .btn-prev');
const reviewsSliderNextButton = document.querySelector('#review .btn-next');
const reviewsSliderPreviousButton = document.querySelector('#review .btn-prev');

const activeAttribute = 'active';

function swapSliderTowards(sliderType) {

  switch (sliderType) {
    case MAIN_SLIDER_TYPE:
      mainSliderPosition -= countMainSliderWidth();
      break;
    case REVIEWS_SLIDER_TYPE:
      reviewsSliderPosition -= countReviewsSliderWidth();
      break;
  }

  setPosition(sliderType);
  checkButtons(sliderType);
}

function swapSliderBackwards(sliderType) {
  switch (sliderType) {
    case MAIN_SLIDER_TYPE:
      mainSliderPosition += countMainSliderWidth();
      break;
    case REVIEWS_SLIDER_TYPE:
      reviewsSliderPosition += countReviewsSliderWidth();
      break;
  }

  setPosition(sliderType);
  checkButtons(sliderType);
}

const setPosition = (a) => {
  if (a == MAIN_SLIDER_TYPE) mainSliderTrack.style.transform = `translateX(${mainSliderPosition}px)`;
  else reviewsSliderTrack.style.transform = `translateX(${reviewsSliderPosition}px)`;
}

const checkButtons = (a) => {
  if (a == MAIN_SLIDER_TYPE) {
    mainSliderPreviousButton.disabled = mainSliderPosition === 0;
    mainSliderNextButton.disabled = mainSliderPosition <= -countMainSliderWidth();
  } else {
    reviewsSliderPreviousButton.disabled = reviewsSliderPosition === 0;
    reviewsSliderNextButton.disabled = reviewsSliderPosition <= -3 * countReviewsSliderWidth();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkButtons(MAIN_SLIDER_TYPE);
  checkButtons(REVIEWS_SLIDER_TYPE);
});

const scrollOffsetToShowScrollUp = document.documentElement.clientHeight / 2;
const scrollUp = document.querySelector('.scroll-up');

const getTop = () => window.pageYOffset || document.documentElement.scrollTop; // scroll position (Y)

window.addEventListener('scroll', () => { // Событие при скроллинге страницы
  if (getTop() > scrollOffsetToShowScrollUp) scrollUp.classList.add(activeAttribute); // Если проскроллено больше расстояния скролла - якорь акт
  else scrollUp.classList.remove(activeAttribute); // Если нет - нет
});

scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  if (scrollUp.classList.contains(activeAttribute)) scrollUp.classList.remove(activeAttribute);
  scrollUp.click();
});

function validateNumbersInput(evt) {
  var theEvent = evt || window.event;

  if (theEvent.type === 'paste') {
    key = clipboardData.getData('text/plain');
  } else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}