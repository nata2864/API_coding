const host = " https://webdev-hw-api.vercel.app/api/v2/natalia-bashirova/comments"

export function getComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }
            return response.json();
        })
}

export function addComments({ name, text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name,
            text,
        }),
        headers: {
            Authorization: token,
        },
    })
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser ({ login,password}) {
    return fetch( "https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then ((response)=>{

        if(response.status===400){
            throw new Error ('Неверный логин или пароль')
        }
        return response.json();
    })
}