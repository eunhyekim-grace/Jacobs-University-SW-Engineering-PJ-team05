import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

/*
 * Temporary dummy data
 */
var gamesData = [{
    id: 1,
    settings: "2 weeks, 0.5, 1",
    totalCost: 1553.5,
    factoryCost: 493,
    distributerCost: 710.5,
    wholesalerCost: 224,
    retailerCost: 126
}, {
    id: 2,
    settings: "2 weeks, 0.5, 1",
    totalCost: 1837.5,
    factoryCost: 349,
    distributerCost: 545,
    wholesalerCost: 566,
    retailerCost: 377.5
}];

/**
* Renders a table component with dummy data
*/
const Table = () => {
    return (
        <BootstrapTable data={gamesData} striped hover>
            <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='settings'>Game Settings</TableHeaderColumn>
            <TableHeaderColumn dataField='totalCost'>Total Cost</TableHeaderColumn>
            <TableHeaderColumn dataField='factoryCost'> Factory Cost</TableHeaderColumn>
            <TableHeaderColumn dataField='distributerCost'>Distributer Cost</TableHeaderColumn>
            <TableHeaderColumn dataField='wholesalerCost'>Wholesaler Cost</TableHeaderColumn>
            <TableHeaderColumn dataField='retailerCost'>Retailer Cost</TableHeaderColumn>
        </BootstrapTable>
    );
};

export default Table;