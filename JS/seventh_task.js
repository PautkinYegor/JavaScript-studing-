
let uncle = { name: 'Фёдор',  age: 19, mustache: false };
let dog = { name: 'Шарик',  age: 4, camera: true };
let cat = { name: 'Матроскин',  age: 5, milk: true };

uncle.pet = cat;
cat.name = 'Дымок';
console.log('-У дядьки-');
console.log(uncle.pet);
console.log('-У кота-');
console.log(cat);

// Так как объект 'cat' вложен в объект 'uncle' и идёт ссылка на этот объект 'cat', соответсвтенно.
// И если мы меняем внутри вложенного объекта что-либо, то по-ссылке передаются все изменённые параметры.
