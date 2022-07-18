const refs = {
  startBtn: document.querySelector('[data-start]'),
  closeBtn: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerId;

refs.startBtn.addEventListener('click', startChangeColor);
refs.closeBtn.addEventListener('click', stopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function BGChangeColor() {
  return (refs.bodyEl.style.backgroundColor = getRandomHexColor());
}

function startChangeColor() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.closeBtn.removeAttribute('disabled');
  timerId = setInterval(BGChangeColor, 1000);
}

function stopChangeColor() {
  refs.closeBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timerId);
}
