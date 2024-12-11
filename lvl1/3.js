/*
Задача 3: Работа с async/await

Написать функцию, которая делает HTTP-запрос к публичному API для получения данных о пользователях и выводит их имена в консоль.
Шаги, которые должна выполнить функция:
Сделать GET-запрос к API https://jsonplaceholder.typicode.com/users, чтобы получить данные о пользователях.
Проверить, успешно ли выполнен запрос. Если нет, выбросить ошибку и обработать её.	
Преобразовать ответ API в формат JSON для дальнейшей работы.
Перебрать массив полученных пользователей и вывести их имена в консоль.
*/



async function fetchUserNames() {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        // GET-запрос к API:
        const response = await fetch(url);

        // проверка, успешно ли выполнен запрос:
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // преобразование ответа:
        const users = await response.json();

        // перебираем массив пользователей:
        users.forEach(user => {
            console.log(user.name);
        });
    } catch (error) {
        console.log('Произошла ошибка:', error.message);
    }
}

fetchUserNames();
