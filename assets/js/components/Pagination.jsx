import React from 'react';

const Pagination = ({currentPage, itemsPerPage, length, handleChangePage}) => {
    
    const PageCount = Math.ceil(length / itemsPerPage);
    const Pages = [];
    for (let i = 1; i <= PageCount; i++) {
        Pages.push(i);
    }
    
    return (
<div>
    <ul className="pagination pagination-sm">
        <li className={"page-item" + (currentPage === 1 && " disabled")}>
        <button className="page-link" onClick = {() => handleChangePage(currentPage - 1)} >&laquo;</button>
        </li>
        {Pages.map(page => <li key={page} className={"page-item" + (currentPage === page && " active")}>
        <button className="page-link"
            onClick = { () => handleChangePage(page)} >
        {page}</button>
        </li> )}
        <li className={"page-item" + (currentPage === PageCount && " disabled")}>
        <button  className="page-link" 
            onClick = {() => handleChangePage(currentPage + 1)} >&raquo;</button >
        </li>
    </ul>
</div>

    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;