
const host = '/'

export const loginAPI = (login: string, password: string) => {
    fetch(host + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: login, 
            password: password
        })
    })
    .then((response) => response.json)
    .then((json: any) => {
        console.log(json.token)
        localStorage.setItem('token', json.token)
    })
}

export const registerAPI = (login: string, password: string) => {
    fetch(host + '/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: login, 
            password: password
        })
    })
    .then((response) => response.json)
    .then((json: any) => {
        console.log(json.token)
        localStorage.setItem('token', json.token)
    })
}

export const getUserVinoyardsAPI = (token: string) => {
    fetch(host + '/user/getVineyards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: token
        })
    })
    .then((response) => response.json)
    .then((json: any) => {
        console.log(json.token)
    })
}

export const setUserVinoyardsAPI = (token: string, vinoyards: []) => {
    fetch(host + '/user/setVineyards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: token,
            vinoyards: vinoyards
        })
    })
    .then((response) => response.json)
    .then((json: any) => {
        console.log(json.token)
    })
}

