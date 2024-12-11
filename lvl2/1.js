/*
Задача 1: Работа с async/await + try…catch, promises

Используя API JSONPlaceholder, реализуйте программу, которая выполняет следующие действия:
1. Получение постов:
Сделать GET-запрос к https://jsonplaceholder.typicode.com/posts для получения списка всех постов.
2. Фильтрация постов:
Выбрать только посты, у которых id чётное.
3. Получение комментариев:
Для каждого выбранного поста сделать GET-запрос к https://jsonplaceholder.typicode.com/comments?postId=<ID> для получения комментариев.
4. Обработка данных:
Найти комментарий с самым длинным текстом для каждого выбранного поста.
5. Сохранение результатов:
Для каждого поста с самым длинным комментарием отправить POST-запрос на https://jsonplaceholder.typicode.com/posts.
В теле запроса указать следующую информацию:
{
  "postId": <ID поста>,
  "longestComment": "<Текст самого длинного комментария>"
}
6. Требования:
Использовать fetch и async/await для выполнения запросов.
Обработать возможные ошибки на всех этапах работы программы.
Выполнить запросы на получение комментариев параллельно для всех выбранных постов.
*/


async function fetchPosts() {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const commentsUrl = 'https://jsonplaceholder.typicode.com/comments?postId=';

    try {
        //1. Получение постов:
        const response = await fetch(postsUrl);
        if (!response.ok) {
            throw new Error(`Ошибкa: ${response.status}`);
        }
        const posts = await response.json();
        //

        //2. Фильтрация постов:
        const evenPosts = posts.filter(post => post.id % 2 === 0);
        //

        //3. Получение комментариев:
        const commentPromises = evenPosts.map(async post => {
            const commentResponse = await fetch(commentsUrl + post.id);
            if (!commentResponse.ok) {
                throw new Error(`Ошибка при получении комментариев для поста ${post.id}: ${commentResponse.status}`);
            }
            const comments = await commentResponse.json();
            return { post, comments };
        });

        const postsWithComments = await Promise.all(commentPromises);
        //


        //4. Обработка данных для нахождения самого длинного комментария:
        const results = postsWithComments.map(({ post, comments }) => {
            const longestComment = comments.reduce((longest, comment) => {
                return comment.body.length > longest.body.length ? comment : longest;
            }, { body: '' });

            return {
                postId: post.id,
                longestComment: longestComment.body
            };
        });

        //5. Сохранение результатов:
        for (const result of results) {
            const postResultResponse = await fetch(postsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: result.postId,
                    longestComment: result.longestComment
                })
            });

            if (!postResultResponse.ok) {
                throw new Error(`Ошибка при сохранении результата для поста ${result.postId}: ${postResultResponse.status}`);
            }

            const savedPost = await postResultResponse.json();
            console.log('Сохраненный пост:', savedPost);
        }
        //

    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}

fetchPosts();
