import React from 'react';
import ReactDom from 'react-dom'
import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import {HashRouter, Switch, Route} from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import FacturePage from './pages/FacturePage';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore!');

const App = () =>{
    return (
        <HashRouter>
            <Navbar/>
            <main className="container pt-3">
            <Switch>
                <Route path = "/factures" component = {FacturePage} />
                <Route path = "/customers" component = {ClientPage} />
                <Route path= "/" component = {HomePage} />
            </Switch>
            </main>
        </HashRouter>
    ) ;
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App/>, rootElement);
