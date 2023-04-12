import {loginUser} from "../api.js"

export function renderLoginComponent({appEl, setToken,fetchAndRenderComments}) {
    const appHtml =  
  `<div class="container">
    <ul class="comments" id="list">
    </ul>
    <div class="add-form">
       
    <input type="text" id="login-input" class="add-form-name" placeholder="Введите логин" />
    <input type="password" id="password-input"
        < input id="password-input" type="password" class="add-form-text" placeholder="Введите пароль"/>
         
        <div class="add-form-row">
            <button id="login-button" class="add-form-button">Войти</button>
        </div>
        </div>
    </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
    const login = document.getElementById ("login-input").value;
    const password = document.getElementById ("password-input").value;

    if (!login) {
      alert ('Введите логин');
      return;
    }

    
    if (!password) {
      alert ('Введите пароль')
      return;
    }


    
    loginUser({
      login: login,
      password: password,
    })
    .then((user) => {
      setToken(`Bearer ${user.user.token}`);
      fetchAndRenderComments();
    }).catch((error) => {
      // TODO: Выводить алерт красиво
      alert(error.message);
    });
  }) 
}

