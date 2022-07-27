import "../../styles/NFTDetail.css";
import * as React from "react";
import Table from "react-bootstrap/Table";





const DataGrid = ({event, price, to, from, date}) => {

    return (
        <Table striped
               style={{
                   color: 'white',
               }}>
            <thead className="datagrid-head">
        {/*<tr className="datagrid-header-tr">
            <th className="datagrid-event-th">Event</th>
            <th className="datagrid-price-th">Price</th>
            <th className="datagrid-from-th">From</th>
            <th className="datagrid-to-th">To</th>
            <th className="datagrid-date-th">Date</th>
        </tr>*/}
        </thead>
                <tbody className="datagrid-body">
                <tr className="datagrid-body-tr">
                    <td className="datagrid-event-td">{event}</td>
                    <td className="datagrid-price-th">{price}</td>
                    <td className="datagrid-from-th">{to}</td>
                    <td className="datagrid-to-th">{from}</td>
                    <td className="datagrid-date-th">{date}</td>
                </tr>
                </tbody>

        </Table>
    )
}

export default DataGrid;