0. npm install

1. Необходимо включить доступ в gmail

1.1. Управление аккаунтом Google -> (левое меню) Безопасность -> Ненадежные приложения, у которых есть доступ к аккаунту -> Разрешить

2. В gmail.json вписать свой логин и пароль

3. Редактировать шаблон email.template.ejs

4. Добавить данные для тегов в email.data.json

5. Запуск из папки send.email `node send.email.js gmail.json email.template.ejs email.data.json`

6. Чекай свою почту, указанную в gmail.json