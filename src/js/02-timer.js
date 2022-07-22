import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonStartEl: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  dayEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const dataNow = new Date();
let getTimeUser;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const getSelectDates = selectedDates[0].getTime();
    const getDataNow = dataNow.getTime();
    if (getSelectDates < getDataNow) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStartEl.removeAttribute('disabled');
      Notify.success('Ok! Let go!');
      getTimeUser = getSelectDates;
      refs.buttonStartEl.addEventListener('click', timer);
    }
  },
};

// Кнопка старт вначале неактивна
refs.buttonStartEl.setAttribute('disabled', true);

// Flatpickr запускаем

flatpickr(refs.inputEl, options);

// Функция Таймер
function timer() {
  const timeId = setInterval(() => {
    // текущая дата на момент нажатия кнопки старт
    const dateNowClick = new Date();
    const deltaTime = getTimeUser - dateNowClick;
    if (deltaTime > 0) {
      updateInterfaceTimer(convertMs(deltaTime));
      refs.buttonStartEl.setAttribute('disabled', true);
    } else {
      clearInterval(timeId);
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
