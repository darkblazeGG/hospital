Перед запуском программы необходимо установить базу данных PostgreSQL
Создать там аккаунт, саму базу данных с доступом из этого аккаунта
Настроить доступ конфигуратор в файле src/database/config.json.

Так же необходимо настроить конфигуратор в файле src/api/config.json
И в файле src/email/config.json.

В последнем конфигураторе необходимо настроить пароль для приложения из настроек аккаунта google

Устанавливаем модули командой npm i/npm init
Командой npm run fill запускаем тестовое заполнение базы данных
Командой npm run dev запускаем работу программы

//Проект считать не слишком удачным как для prod