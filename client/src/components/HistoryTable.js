import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

/*
 * Temporary dummy data
 */
var historyData = [{
    week: 1,
    inv: 12,
    demand: 4,
    incom: 4,
    outg: 4,
    orderplaced: 5,
    currcost: 6
}, {
    week: 2,
    inv: 12,
    demand: 4,
    incom: 4,
    outg: 4,
    orderplaced: 0,
    currcost: 12
}, {
    week: 3,
    inv: 15,
    demand: 2,
    incom: 5,
    outg: 2,
    orderplaced: 0,
    currcost: 19.5
}];

const HTable = () => {
    return (
        <BootstrapTable data={historyData} striped hover>
            <TableHeaderColumn dataField='week' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='inv'>Inventory</TableHeaderColumn>
            <TableHeaderColumn dataField='demand'>Demand</TableHeaderColumn>
            <TableHeaderColumn dataField='incom'> Incom. Shipment</TableHeaderColumn>
            <TableHeaderColumn dataField='outg'>Outg. Shipment</TableHeaderColumn>
            <TableHeaderColumn dataField='orderplaced'>Order Placed</TableHeaderColumn>
            <TableHeaderColumn dataField='currcost'>Current Cost</TableHeaderColumn>
        </BootstrapTable>
    );
};

export default HTable;