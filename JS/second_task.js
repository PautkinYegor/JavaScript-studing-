let login = prompt('Please, enter in system:', 'login');
let message = 'Вход отменён';

if (login == null) {
  alert(message);
} else if (login == 'Админ') {
    let pass = prompt('Enter the password:', 'passwd');
    if (pass == null){
      alert(message);
    } else {
      (pass == 'Чёрный Властелин') ? alert('Добро пожаловать!') : alert('Пароль неверен');
    }
} else {
    alert('Я вас не знаю');
}
