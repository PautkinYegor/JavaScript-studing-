// чувствителен к регистру...

let text = prompt('Введите сообщение', '');
let badWords = ['хэй', 'ихний', 'евошний', 'тамошний', 'ивойный', 'кириешка'];

for (let j = 0; j < badWords.length; ++j)
{
  let result = badWords[j];
  if (~text.indexOf(result))
  {
    text = text.replace(result, '***');
  }
}
console.log(text);