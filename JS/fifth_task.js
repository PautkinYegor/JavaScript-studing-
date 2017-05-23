let text = prompt('Я жду вашей реплики', '');
text = text.toLowerCase();

if ((text.indexOf("чёрт побери")) !== (-1))
{
  alert( 'Поскользнулся, упал. Очнулся - гипс' );
}
else
{
  alert( 'Я вас не понимаю' );
}
