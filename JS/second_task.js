let login = prompt('Please, enter in system:', 'login'), 
  pass = null,
  exits = 'Вход отменён';

function admin() {
  pass = prompt('Enter the password:', 'passwd');
  (pass == null) ? alert(exits) : 
  (pass == 'Чёрный Властелин') ? alert('Добро пожаловать!') : alert('Пароль неверен');
}

  (login == null) ? alert(exits) : (login == 'Админ') ? admin() : alert('Я вас не знаю');
