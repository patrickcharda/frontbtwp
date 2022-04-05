/**
 * Le but de cette classe est d'encapsuler les méthodes pour pouvoir faire
 * les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url qui retourne du JSON et retourne son contenu.
     * Pour s'en servir : let content = await Model.get("url");
     * @param {string} url 
     * @return {Promise}
     */
    static exception(fullmessage, shortmessage) {
        this.fullmessage = fullmessage;
        this.shortmessage = shortmessage;
    }

    static get(url) {
        return fetch(url)
            .then(function(httpBodyResponse) {
                // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
                // Du coup, avec .json, on récupère la partie "json" de la réponse, qui est ce dont
                // on a réellement besoin. 
                if (httpBodyResponse.ok) {
                    // si le fetch a fonctionné (url correcte), alors on retourne le json. 
                    // si le body ne contient pas de json, alors la méthode json() renverra aussi une 
                    // exception qui sera attrapée dans le routeur. 
                    return httpBodyResponse.json();
                } else {
                    // Sinon, envoie une erreur (qui sera attrapée dans le routeur)
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }

    static login(url, nameOrToken, pwd) {
        if (pwd != '') {
            var data = {
                username: nameOrToken,
                password: pwd
            } 
        } else  {
            var data = {
                refresh : nameOrToken
            }
        }
        
        return fetch(url,
        { 
            method: 'POST',
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)     
        })
        .then(function(httpBodyResponse) {
            if (httpBodyResponse.ok) {
                return httpBodyResponse.json();
            } else {
                var pb = {
                    fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
                } 
                throw pb;
            }
        })
        .catch((error) => {
            return error;
        });
    }

    static patchBli(url, token, bli) {
            var data = {
                bli_select: bli.chk,
                bli_observ: bli.obs,
                bli_comment: bli.cmt,
                bli_qte: parseFloat(bli.qte),
            }
            
        return fetch(url,
        { 
            method: 'PATCH',
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer "+ token
            },
            body: JSON.stringify(data)     
        })
        .then(function(httpBodyResponse) {
            if (httpBodyResponse.ok) {
                return httpBodyResponse.json();
            } else {
                var pb = {
                    fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
                } 
                throw pb;
            }
        })
        .catch((error) => {
            return error;
        });
    }

    static patchBl(url,token, formatedDate) {
        var data = {
            bl_dateimport: formatedDate
        }
    
    return fetch(url,
    { 
        method: 'PATCH',
        headers: { 
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer "+ token
        },
        body: JSON.stringify(data)     
    })
    .then(function(httpBodyResponse) {
        if (httpBodyResponse.ok) {
            return httpBodyResponse.json();
        } else {
            var pb = {
                fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
            } 
            throw pb;
        }
    })
    .catch((error) => {
        return error;
    });
    }

    static getBls(url, token) {
        return fetch(url,
            {
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    var pb = {
                        fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
                    } 
                    throw pb;
                }
            })
            .catch((error) => {
                return error;
            });
    }
    static getBl(url, token) {
        return fetch(url,
            {
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    var pb = {
                        fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
                    } 
                    throw pb;
                }
            })
            .catch((error) => {
                return error;
            });
    }
    static getBli(url, token) {
        return fetch(url,
            {
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    var pb = {
                        fullmessage : `${httpBodyResponse.status} - ${httpBodyResponse.statusText}`,
                    } 
                    throw pb;
                }
            })
            .catch((error) => {
                return error;
            });
    }
/*     static getBli(url, token) {
        return fetch(url,
            {
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    } */
}