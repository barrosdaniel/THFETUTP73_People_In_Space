// const breakfastPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('Oh no! There was a problem with your order.');
//   }, 3000);
// });

// breakfastPromise.then(val => console.log(val)).catch(err => console.log(err));

// console.log(breakfastPromise);
const order = false;

const breakfastPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (order) {
      resolve('Your order is ready. Come and get it!');
    } else {
      reject(Error('Your order cannot be made.'));
    }
  }, 3000);
});

breakfastPromise
  .then(val => console.log(val))
  .catch(err => console.log(err));

console.log(breakfastPromise);