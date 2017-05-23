let begining = prompt('Введите начало диапазона');
let ending = prompt('Введите конец диапазона');

function showPrime(n)
{
  if (n > 1)
  {
  for (let j = 2; j * j <= n; ++j)
    if (n % j == 0)
    {
        return false;
    }
      return true;
  }
}

begining = parseInt(begining);
ending = parseInt(ending);

if ((Number.isInteger(begining)) && (Number.isInteger(ending)))
{
  for (let i = begining; i <= ending; ++i)
  {
    if (Prime(i))
    {
      console.log(i);
    }
  }
}
else
{
  console.log('Введён неверный интервал');
}
