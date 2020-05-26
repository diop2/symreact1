import axios from "axios";
import jwtDecode from "jwt-decode"

/**
 * Requête HTTP d'authentification et stockage du token dans localStorage et sur axios
 * @param {object} connexion 
 */
function authentification(connexion) {
    return axios
    .post("http://localhost:8000/api/login_check", connexion)
    .then(response=>response.data.token)
    .then(token => {
        //stockage du token dans le localStorage
    window.localStorage.setItem("authToken", token); 
    
    //Prévenir axios qu'on a un headersur toutes les requettes HTTP
        setAxiosToken(token);
    });
    
}
/**
 * Position du token sur axios
 * @param {string} token le Token JWT
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Déconnexion(Suppression  du token du localStorage et sur axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


/**
 * Mise en place lors du chargement de l'application
 */
function setup(){
    // 1. Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    
    //2. Si le token est encore valide 
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration*1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}


/**
 * Permet de savoir si on est authentifié ou bien   
 */
function connect(){
    // 1. Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    
    //2. Si le token est encore valide 
    
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration*1000 > new Date().getTime()) {
            return true;
        }return false;
    }return false;
}

export default {
    authentification,
    logout,
    setup,
    connect,
};