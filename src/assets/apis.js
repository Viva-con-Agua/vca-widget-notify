import axios from 'axios'

var call = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_DEV,
    headers: {
        'Content-Type': 'application/json'
        },
    withCredentials: true

})
call.interceptors.response.use((response) => {
    return response;
    }, (error) => {
        if (error.response.status !== 401 && error.response.data.message !== 'missing or malformed jwt') {
            return new Promise((resolve, reject) => {
                reject(error)
            });
        }
        if (error.config.url == '/v1/auth/refresh' ) {
            return new Promise((resolve, reject) => {
                reject(error);
                console.log('LOGOU1');
            });
        }
        return new Promise((resolve, reject) => 
            call.get('/v1/auth/refresh')
                .then((response) => {
                    if (response.status === 200) {
                        const config = error.config;
                        axios.request(config).then(response => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error)
                            console.log('LOGOU2');
                        })
                    }
                }).catch((error) => {
                    reject(error)
                    console.log('LOGOU3');
                })
        )
    })

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function storeJWT(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getJWT(key) {
    return JSON.parse(localStorage.getItem(key))
}



export default class api {
    constructor () {
    }
    static get call() {
        return call
    }
    static parseJwt(token) {
        return parseJwt(token)
    }
    static storeJWT(key, value) {
        return storeJWT(key, value)
    }
    static getJWT(key) {
        return getJWT(key)
    }
}
