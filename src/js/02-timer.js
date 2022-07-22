import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonStartEl: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  dayEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  //reset
  buttonResetEl: document.querySelector('[data-reset]'),
};

const dataNow = new Date();
let getTimeUser = null;
//reset
let timeId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const getSelectDates = selectedDates[0].getTime();
    const getDataNow = dataNow.getTime();
    if (getSelectDates < getDataNow) {
        Notify.failure('Please choose a date in the future');
        refs.buttonStartEl.setAttribute('disabled', true);
        refs.buttonStartEl.classList.remove('timer-button__start');

    } else {
      refs.buttonStartEl.removeAttribute('disabled');

      //color start button
      refs.buttonStartEl.classList.add('timer-button__start');

      Notify.success('Ok! Let go!');
      getTimeUser = getSelectDates;
      refs.buttonStartEl.addEventListener('click', timer);
    }
  },
};

// Кнопка старт вначале неактивна
refs.buttonStartEl.setAttribute('disabled', true);
//Reset
refs.buttonResetEl.setAttribute('disabled', true);

// Flatpickr запускаем

flatpickr(refs.inputEl, options);

// Функция Таймер
function timer() {
  timeId = setInterval(() => {
    // текущая дата на момент нажатия кнопки старт
    const dateNowClick = new Date();
    const deltaTime = getTimeUser - dateNowClick;
    if (deltaTime > 0) {
      updateInterfaceTimer(convertMs(deltaTime));
      refs.buttonStartEl.setAttribute('disabled', true);
      //input off
      refs.inputEl.setAttribute('disabled', true);

      //Снимаем неактивность с ресет
      refs.buttonResetEl.removeAttribute('disabled');
      refs.buttonResetEl.classList.add('timer-button__start');

      //color start button
      refs.buttonStartEl.classList.remove('timer-button__start');
    } else {
      clearInterval(timeId);
      Notify.info('Time is over');
      refs.buttonResetEl.classList.remove('timer-button__start');
      refs.buttonResetEl.setAttribute('disabled', true);
      refs.inputEl.removeAttribute('disabled');
    }
  }, 1000);
  //   console.log('Привет');
}

//Функция обновления интерфейса
function updateInterfaceTimer({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

// Функция конвертирует время
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//Форматирует значение добавляя ноль при необходимости
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//Функционал RESET
refs.buttonResetEl.addEventListener('click', onReset);

function onReset() {
  refs.inputEl.removeAttribute('disabled');
  refs.buttonResetEl.setAttribute('disabled', true);
  updateInterfaceTimer(convertMs(0));
  clearInterval(timeId);
  Notify.warning('Attention! Timer has been reset');
  refs.buttonResetEl.classList.remove('timer-button__start');
}
