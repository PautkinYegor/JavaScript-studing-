begining = prompt('Введите начало диапазона');
ending = prompt('Введите конец диапазона');

nextPrime:
  for (var i = 2; i < +ending; i++) {

    for (var j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    (i >= +begining) ? console.log(i) : console.log;
  }