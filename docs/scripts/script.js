let pos1 = 0;
let pos2 = 0;

const itemWidth1 = () => document.querySelector('#main-slider .slider-container').clientWidth;
const itemWidth2 = () => document.querySelector('#review .slider-container').clientWidth;

const track1 = document.querySelector('#main-slider .slider-track'); 
const track2 = document.querySelector('#review .slider-track'); 

const btnNext1 = document.querySelector('#main-slider .btn-next');
const btnPrev1 = document.querySelector('#main-slider .btn-prev');
const btnNext2 = document.querySelector('#review .btn-next');
const btnPrev2 = document.querySelector('#review .btn-prev');

const act = 'active'; 

function btnNext(a) {
  if (a == 1) pos1 -= itemWidth1(); 
  else pos2 -= itemWidth2();
  
  setPosition(a); 
  checkButtons(a);
}

function btnPrev(a) {
  if (a == 1) pos1 += itemWidth1();
  else pos2 += itemWidth2();

  setPosition(a);
  checkButtons(a); 
}

const setPosition = (a) => { 
  if (a == 1) track1.style.transform = `translateX(${pos1}px)`;
  else track2.style.transform = `translateX(${pos2}px)`;
}

const checkButtons = (a) => {
  if (a == 1) {
    btnPrev1.disabled = pos1 === 0; 
    btnNext1.disabled = pos1 <= -itemWidth1(); 
  } else {
    btnPrev2.disabled = pos2 === 0; 
    btnNext2.disabled = pos2 <= -3 * itemWidth2();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkButtons(1);
  checkButtons(2);
});

const offset = document.documentElement.clientHeight / 2; // Расстояние скролла, при котором показать якорь
const scrollUp = document.querySelector('.scroll-up'); // Собственно, якорь

const getTop = () => window.pageYOffset || document.documentElement.scrollTop; // Считает позицию скролла по У

window.addEventListener('scroll', () => { // Событие при скроллинге страницы
  if (getTop() > offset) scrollUp.classList.add(act); // Если проскроллено больше расстояния скролла - якорь акт
  else scrollUp.classList.remove(act); // Если нет - нет
});

scrollUp.addEventListener('click', () => { 
  window.scrollTo({ 
    top: 0,
    behavior: 'smooth'
  });

  if (scrollUp.classList.contains(act)) scrollUp.classList.remove(act);
  scrollUp.click();
});

function validateNumbersInput(evt) {
  var theEvent = evt || window.event;

  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

