let begining = prompt('Введите начало диапазона');
let ending = prompt('Введите конец диапазона');

function Prime(n) {
  let p = n > 1;
  for (let j = 2; j * j <= n && p; ++j)
    if (n % j == 0) {
      p = false;
    }
  return p; 
}

  begining = parseInt(begining);
  ending = parseInt(ending);

if ((Number.isInteger(begining)) && (Number.isInteger(ending))) {
  for (let i = begining; i <= ending; ++i) {
    if (Prime(i)) {
      console.log(i);
    }
  }
} else {
  console.log('Введён неверный интервал');
}
