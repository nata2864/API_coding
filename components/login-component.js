import { loginUser,registerUser } from "../api.js"


export function renderLoginComponent({ appEl, setToken, fetchAndRenderComments }) {
  let isLoginMode = true;


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


        <input type="text" id="login-input"
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


    appEl.innerHTML = appHtml;


    document.getElementById("login-button").addEventListener("click", () => {
        if (isLoginMode){
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
                alert(error.message);
              });
        } else {
            const name = document.getElementById("name-input").value;
            const login = document.getElementById("login-input").value;
            const password = document.getElementById("password-input").value;

            if (!name) {
                alert('Введите имя');
                return;
              }
              
      
            if (!login) {
              alert('Введите логин');
              return;
            }
      
      
            if (!password) {
              alert('Введите пароль')
              return;
            }
      
      
            registerUser({
              login: login,
              password: password,
              name:name,
            })
              .then((user) => {
      
      
                setToken(`Bearer ${user.user.token}`);
                fetchAndRenderComments();
              }).catch((error) => {
                alert(error.message);
              });
        }
   
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  }

  renderForm();
}
