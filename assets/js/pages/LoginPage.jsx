import React, {useState, useContext} from 'react';
import AuthAPI from '../services/AuthAPI';
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({history}) => {
    
    const {setConnect} = useContext(AuthContext)
    
    const [connexion, setConnexion] = useState({
        username: "",
        password: "",
    });
    
    const [error, setError] = useState("")
    
    //gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setConnexion({ ...connexion, [name]: value});
    };
    
    //gestion de la soumission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AuthAPI.authentification(connexion);
            setError("");
            setConnect(true);
            history.replace("/customers")        
        } catch (error) {
            console.log(error.response);
            setError("information invalide")
        }
    }
    
    return ( 
        <> 
            <h1>Connexion à l'application</h1>
            
            <form onSubmit = {handleSubmit} >
                <div className="form-group"><label htmlFor="username">Adresse email</label>
                <input 
                    onChange = {handleChange}
                    value= {connexion.username} 
                    type="email" placeholder = "Email" 
                    name = "username" id ="username" 
                    className={"form-control" + (error && " is-invalid")}/>
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                
                
                <div className="form-group"><label htmlFor="password">Mot de passe</label>
                    <input 
                    onChange = {handleChange}
                    value= {connexion.password} 
                    type="password" 
                    placeholder = "Mot de passe" 
                    name = "password" id= "password" 
                    className={"form-control" + (error && " is-invalid")}/>
                    {error && <p className="invalid-feedback">{error}</p>}
                    
                </div>
            
                <div className="form-group"><button type="submit" className="btn btn-success">Se Connecté</button></div>
            </form>
        </>
    );
}

export default LoginPage;
