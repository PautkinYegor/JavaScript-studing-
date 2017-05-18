let login = prompt('Please, enter in system:', 'login'), pass = null;

function admin() {
  pass = prompt('Enter the password:', 'passwd');
  (pass == null) ? alert('Вход отменён') : 
  (pass == 'Чёрный Властелин') ? alert('Добро пожаловать!') : alert('Пароль неверен');
}

  (login == null) ? alert('Вход отменён') : (login == 'Админ') ? admin() : alert('Я вас не знаю');
