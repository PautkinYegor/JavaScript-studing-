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

if (isFinite(begining) && isFinite(ending)) {
  begining = +begining;
  ending = +ending;
  for (let i = begining; i <= ending; ++i) {
    if (Prime(i)) {
      console.log(i);
    }
  }
} else {
  console.log('Введён неверный интервал');
}
