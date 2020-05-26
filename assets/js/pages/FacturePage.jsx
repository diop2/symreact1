import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import moment from 'moment';
import FacturesAPI from '../services/FacturesAPI'

const STATUS = {
    PAYé: "success",
    ANNULé: "primary",
    ENVOYé: "danger"
}

const itemsPerPage = 10;
const FacturePage = (props) => {
    const [factures, setFactures] = useState([]);
    const [currentPage, setCurrentPage]= useState(1); 
    const [search, setSearch]= useState("");
    
    //recupération des factures
    const recupFactures = async ()  =>{
        try {
            const data =  await FacturesAPI.findAll();
        setFactures(data);
        } catch (error) {
            console.log(error.response); 
        }
    }
    
    //chargé les factures
    useEffect(() =>{
         recupFactures();
    }, []);
    
    
    //supression des factures
    const handleDelete = async id =>{
        const originalFactures = [...factures];
        setFactures(factures.filter(facture => facture.id !== id));
        
        try {
            await FacturesAPI.delet(id);
        } catch (error) {
            console.log(error.response);
            setFactures(originalFactures);
        }
    }
    
     //gestion de chargement de page
     const handleChangePage = page =>setCurrentPage(page);
    
     //gestion de la recherche
     const handleSearch = event =>{
         const value = event.currentTarget.value;
         setSearch(value);
         setCurrentPage(1);
     }
     
       //filtrage des clients en function de la recherche
    const FacturesSearch = factures.filter(
        i =>i.customer.prenom.toLowerCase().includes(search.toLowerCase()) 
        || i.customer.nom.toLowerCase().includes(search.toLowerCase())
        || i.montant.toString().toLowerCase().includes(search.toLowerCase())
        || i.status.toLowerCase().startsWith(search.toLowerCase())
    );
    
    //pagination des factures
    const paginationFactures = Pagination.getData(FacturesSearch, currentPage, itemsPerPage);
    
    
    //fonction pour formater des factures
    const formatdate = (str) => moment(str).format('DD/MM/YYYY');
    
    return( 
        <>
            <h1> Liste des Factures </h1>
            
            <div className="form-group">
            
            <input type="text" onChange= {handleSearch} value = {search} className="form-control bold" placeholder="Rechercher ..."/>
            
            </div>
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className = "text-center">Date d'envoie</th>
                        <th className = "text-center">Statut</th>
                        <th className = "text-center">Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {paginationFactures.map(facture => <tr key ={facture.id}>
                        <td>{facture.chrono}</td>
                            <td ><a href="#">{facture.customer.prenom} {facture.customer.nom}</a> 
                        </td>
                        <td className = "text-center">{formatdate(facture.sentAt)}</td>
                        <td className="text-center"> 
                <span className={"badge badge-" + STATUS[facture.status]}>{facture.status}</span> 
                        </td>
                        <td className="text-center">{facture.montant} Fr</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-2"> Editer </button>
                            <button className="btn btn-sm btn-danger" 
                            onClick= {() => handleDelete(facture.id)}
                            > Supprimer </button>
                        </td>
                    </tr> )}
                    
                </tbody>
            </table>
            { itemsPerPage < FacturesSearch.length &&(<Pagination currentPage = {currentPage} itemsPerPage = {itemsPerPage} handleChangePage={handleChangePage}
             length = {FacturesSearch.length} />)}
        </>
        
    );
};
 
export default FacturePage;