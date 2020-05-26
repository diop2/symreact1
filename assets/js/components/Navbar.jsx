import React, { useContext } from 'react';
import AuthAPI from '../services/AuthAPI';
import {NavLink} from "react-router-dom";
import AuthContext from '../contexts/AuthContext';


const Navbar = ({history}) => {
    
    
    const {connect, setConnect} = useContext(AuthContext);
    
    const handleLogout = () => {
        AuthAPI.logout();
        setConnect(false);
        history.replace("/login")
    };  
    
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">FACTURE</NavLink>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01"
         aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <NavLink className="nav-link" to = "/customers">Clients</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to = "/factures">Factures</NavLink>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
        {!connect && 
         <>
            <li className="nav-item">
                <NavLink to="#" className="nav-link">Inscription</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to = "/login" className="btn btn-success">Connexion</NavLink>
            </li>
         </> ||
            <li className="pl-2 nav-item">
                <button onClick = {handleLogout} className="btn btn-danger">Déconnexion</button>
            </li>
         }
            
            
        </ul>
        </div>
    </nav>  
  );
}

export default Navbar;

