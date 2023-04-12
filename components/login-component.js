import {login} from "../api.js"

export function renderLoginComponent({appEl, setToken,fetchAndRenderComments}) {
    const appHtml =  
  `<div class="container">
    <ul class="comments" id="list">
    </ul>
    <div class="add-form">
        <input id="login-input" type="text" class="add-form-name" placeholder="Введите логин" />
        <textarea id="login-input" type="textarea" class="add-form-text" placeholder="Введите пароль" rows="4">
            </textarea>
        <div class="add-form-row">
            <button id="login-button" class="add-form-button">Войти</button>
        </div>
        </div>
    </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById ("login-button").addEventListener ('click', () => {
  
    // setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");

    login({
      login: "admin",
      password: "admin"
    }).then((user)=>{
      console.log(user)
      // user.user.token
      setToken(`Bearer ${user.user.token}`);

      fetchAndRenderComments();
    });
    
  }) 
}

