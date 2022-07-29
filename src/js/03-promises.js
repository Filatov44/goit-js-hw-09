import { Notify } from 'notiflix/build/notiflix-notify-aio';

const NOTIFICATION_DELAY = 2000;

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('[data-start]'),
};

refs.form.addEventListener('submit', onSubmit);
// refs.submitBtn.disabled = true;
// refs.submitBtn.setAttribute('disabled', true);

function onSubmit(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);

  refs.submitBtn.setAttribute('disabled', true);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  setTimeout(() => {
    refs.submitBtn.removeAttribute('disabled');
  }, delay + NOTIFICATION_DELAY);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   form: document.querySelector('.form'),
//   submitBtn: document.querySelector('submit'),
// };

// refs.form.addEventListener('submit', onSubmit);

// function onSubmit(event) {
//   event.preventDefault();

//   let delay = Number(event.currentTarget.delay.value);
//   let step = Number(event.currentTarget.step.value);
//   let amount = Number(event.currentTarget.amount.value);

//   for (let i = 1; i <= amount; i += 1) {
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += step;
//   }
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
