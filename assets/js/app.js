import React, {useState, useContext} from 'react';
import ReactDom from 'react-dom'
import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import {HashRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import FacturePage from './pages/FacturePage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';


AuthAPI.setup();


const App = () =>{
    const [connect, setConnect] = useState(
        AuthAPI.connect()
    );
    
    const NavbarRouter = withRouter(Navbar)

    
    return (
        <AuthContext.Provider value={{connect, setConnect}}>
            <HashRouter>
                <NavbarRouter/>
                <main className="container pt-3">
                <Switch>
                    <Route path = "/login" component = {LoginPage}/>
                    <PrivateRoute path = "/factures" component = {FacturePage} />
                    <PrivateRoute path = "/customers" component = {ClientPage} />
                    <Route path="/" component={HomePage}/>
                     
                </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    ) ;
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App/>, rootElement);
