
var login = prompt('Please, enter in system:', 'login');

if (login == null) {
    alert('Вход отменён')
} else if (login == 'Админ') {
    pass = prompt('Enter the password:', 'passwd');
    (pass == null) ? alert('Вход отменён') : 
    (pass == 'Чёрный Властелин') ? alert('Добро пожаловать!') : alert('Пароль неверен')
} else {
    alert('Я вас не знаю')
}

