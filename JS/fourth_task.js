let begining = 2,
  ending = 10;

begining = prompt('Введите начало диапазона');
ending = prompt('Введите конец диапазона');

nextPrime:
  for (let i = 2; i < +ending; i++) {

    for (var j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    if (i >= +begining) {
      console.log(i);
    }
  }
