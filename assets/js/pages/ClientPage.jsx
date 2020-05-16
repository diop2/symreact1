import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersAPI from '../services/CustomersAPI';

const ClientPage = props => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    
    //recupération des clients
    const recupCustomers = async () => {
        try {
         const data = await CustomersAPI.findAll()
            setCustomers(data)
        } catch (error) {
            console.log(error.response);
        }
    }
    
    //chargement des clients recherchés
    useEffect(()=>{
        recupCustomers();
        }, []);
    
    //Supreesion d'un client
    const handleDelete = async id =>{
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        
        try {
            await  CustomersAPI.delet(id);
        } catch (error) {
            setCustomers(originalCustomers);
        }
    };
    
    //gestion de chargement de page
    const handleChangePage = page =>setCurrentPage(page);
    
    //gestion de la recherche
    const handleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }
    
    
    //filtrage des clients en function de la recherche
    const customersSearch = customers.filter(
        c =>c.prenom.toLowerCase().includes(search.toLowerCase()) 
        || c.nom.toLowerCase().includes(search.toLowerCase())
        || c.email.toLowerCase().includes(search.toLowerCase())
        || (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );
    
    const itemsPerPage = 8;
    
    //pagination des données
    const paginationCustomers = Pagination.getData(customersSearch, currentPage, itemsPerPage);
    
    
    return ( 
        <>
            <h1>Liste des clients</h1> 
            
            <div className="form-group">
            
            <input type="text" onChange= {handleSearch} value = {search} className="form-control bold" placeholder="Rechercher ..."/>
            
            </div>
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className = "text-center">Factures</th>
                        <th className = "text-center">Montant Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginationCustomers.map(customer=> <tr key = {customer.id}>
                        <td>{customer.id}</td>
                        <td>
                        <a href="#">{customer.prenom} {customer.nom}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className = "text-center">
                        <span className="badge badge-primary">{customer.factures.length}</span>
                        </td>
                        <td className = "text-center">{customer.totalMontant.toLocaleString()} Fr</td>
                        <td>
                        <button 
                            onClick={()=> handleDelete(customer.id)}
                            disabled={customer.factures.length>0} 
                            className="btn btn-sm btn-danger">
                            Supprimer
                        </button>
                        </td>
                    </tr> )}
                    
                </tbody>
            </table>
            
            { itemsPerPage < customersSearch.length && (
                <Pagination 
            currentPage={currentPage} 
            itemsPerPage = {itemsPerPage} 
            length={customersSearch.length} 
            handleChangePage={handleChangePage} />   
            )}
            
            
        </> );
}
 
export default ClientPage;