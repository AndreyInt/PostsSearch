# Поисковик постов

## Что сделано:
+ Был добавлен адаптив к макету
+ Добавлена пагинация (с сервера запрашивается по 21 посту)
+ Поиск по нажатию enter только при фокусе на инпуте для ввода запроса
+ Динамический роутинг для постов
+ Обработка ошибки если посты найдены не были
+ Обработаны случаи: 
  * перехода пользователя на страницу конкретного поста извне (по ссылке) или же ее обновления 
  * перехода пользователя с главной страницы на страницу поста с переносом его реакций проставленных на главной странице и наоборот.

## Использованные технологии:
+ react
+ typescript
+ module scss
+ redux-toolkit

## Запуск проекта:
1. npm i
2. npm start
