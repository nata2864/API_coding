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