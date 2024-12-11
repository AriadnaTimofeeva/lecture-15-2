/*
Задача 1: Работа с async/await

Напишите функцию delay, которая будет симулировать задержку с помощью setTimeout. Эта функция должна принимать один параметр ms (время задержки в миллисекундах) и возвращать промис, который будет выполнен через указанное время.
Далее создайте асинхронную функцию performAction, которая сначала выведет сообщение "Action started", затем вызовет функцию delay с задержкой 2000 миллисекунд (2 секунды), и после этого выведет сообщение "Action completed after delay".
Требования:
Используйте async/await для асинхронной работы.
Примените вашу функцию delay внутри performAction.
Сообщения должны выводиться в правильном порядке.
*/



const delay = (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const performAction = async () => {
    console.log("Action started.");
    
    await delay(2000);
    
    console.log("Action completed after delay.");
};

performAction();
