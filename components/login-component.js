<<<<<<< HEAD
import { loginUser } from "../api.js"

export function renderLoginComponent({ appEl, setToken, fetchAndRenderComments }) {
  let isLoginMode = false;

  const renderForm = () => {
    const appHtml =
      `<div class="container">
        <ul class="comments" id="list">
        </ul>
        <div class="add-form">
        <h3 class= "form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
        ${isLoginMode
        ? ""
        : `<input type="text" id="name-input" class="add-form-text" placeholder="Введите имя" />`}

        <input type="password" id="password-input"
             class="add-form-text" placeholder="Введите логин"/>
    
             <input type="password" id="password-input"
             class="add-form-text" placeholder="Введите пароль"/>   
             
            <div class="add-form-registrationrow">
                <button id="login-button" class="add-form-registrationbutton">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
             
            </div>
            <div class="add-form-registrationrow">
            
                <button id="toggle-button" class="add-form-registrationbutton">Перейти${isLoginMode ? " к регистрации" : " ко входу"}</button>
            </div>
            </div>
        </div>`;
=======
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
>>>>>>> 4d78ce6181f3c278887f3595fcb5f20cd33515e9

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
<<<<<<< HEAD
      const login = document.getElementById("login-input").value;
      const password = document.getElementById("password-input").value;

      if (!login) {
        alert('Введите логин');
        return;
      }

      if (!password) {
        alert('Введите пароль')
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

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  }

  renderForm();
=======
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
>>>>>>> 4d78ce6181f3c278887f3595fcb5f20cd33515e9
}
