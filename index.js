import { addComments, getComments } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js"

let myDate = new Date();
let year = myDate.getFullYear().toString().slice(-2);
let month = (myDate.getMonth() + 1);
let day = myDate.getDate();
let hour = myDate.getHours();
let minute = myDate.getMinutes();
let second = myDate.getSeconds();

if (minute < 10) {
    minute = "0" + minute;
}
if (hour < 10) {
    hour = "0" + hour;
}
if (day < 10) {
    day = "0" + day;
}
if (month < 10) {
    month = "0" + month;
}
let fullDate = day + "." + month + "." + year + " " + hour + ":" + minute;

let comments = [];

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

const fetchAndRenderComments = () => {
    return getComments({ token }).then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: fullDate,
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        comments = appComments;
        renderApp();
    });
}

const renderApp = () => {
    const appEl = document.getElementById('app');
    if (!token) {
        renderLoginComponent({
            appEl,
            setToken: (newToken) => {
                token = newToken;
            },
            fetchAndRenderComments
        });
        return;
    }

    const commentsHtml = comments.map((comment, index) => {
        return `<li data-index = '${index}' id = "list-comment" class="comment">
        <div class="comment-header">
          <div>  ${comment.name.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
            } </div>
          <div> ${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
            }
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index = '${index}' class="${comment.isLiked ? 'like-button -active-like' : 'like-button'
            }"></button>
          </div>
        </div>
      </li>`;
    }).join('');

    const appHtml =
        `<div class="container">

    <ul class="comments" id="list">
      <!-- Список рендериться из js-->
    ${commentsHtml}
    </ul>
    <div class="add-form">
      <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="comments-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4">
        </textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
  </div>`


    appEl.innerHTML = appHtml;

    const clickLikeButton = () => {
        const likeButtonsElements = document.querySelectorAll('.like-button');

        for (const likeButtonElement of likeButtonsElements) {
            likeButtonElement.addEventListener('click', () => {
                event.stopPropagation();
                const index = likeButtonElement.dataset.index;
                if (comments[index].isLiked) {
                    comments[index].isLiked = false;
                    comments[index].likes -= 1;
                } else {
                    comments[index].isLiked = true;
                    comments[index].likes += 1;
                }
                renderApp();
            });
        }
    };

    const clickComment = () => {
        const comment = document.querySelectorAll('.comment');
        for (const commentElement of comment) {
            commentElement.addEventListener('click', () => {
                const index = commentElement.dataset.index;
                commentsInputElement.value = `${comments[index].name}
      ${comments[index].text}`;
            });
        }
    };

    const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentsInputElement = document.getElementById("comments-input");

    buttonElement.addEventListener("click", () => {
        nameInputElement.classList.remove('error');
        commentsInputElement.classList.remove('error');

        if (nameInputElement.value === "" || commentsInputElement.value === "") {
            nameInputElement.classList.add('error');
            commentsInputElement.classList.add('error');
            return;
        };

        buttonElement.disabled = true;
        buttonElement.textContent = "Элемент добавлятся...";

        addComments({
            name: nameInputElement.value,
            text: commentsInputElement.value,
            token
        })
            .then((response) => {

                if (response.status === 201) {
                    return response;
                } else if (response.status === 400) {
                    return alert("Имя и комментарий должны быть не короче 3 символов");
                } else {
                    return alert("Сервер сломался, попробуй позже");
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return response;
            })
            .then(() => {
                return fetchAndRenderComments();
            })
            .then((data) => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                nameInputElement.value = '';
                commentsInputElement.value = '';

                // Вызываем метод catch чтобы отловить ошибку
            }).catch((error) => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                console.warn(error);
            });

    });

    clickLikeButton();
    clickComment();

};
renderApp();


