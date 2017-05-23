let vasya = { name: "Вася", age: 23 };
let masha = { name: "Маша", age: 18 };
let vovochka = { name: "Вовочка", age: 6 };

let people = [ vasya, masha, vovochka ];

function compareAge(personA, personB)
{
  return personA.age - personB.age;
}

people.sort(compareAge);

for (var i = 0; i < people.length; i++) 
{
  console.log(people[i].name);
}
