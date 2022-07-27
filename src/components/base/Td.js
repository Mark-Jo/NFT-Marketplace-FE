import React from "react";

const Td = ({item}) => {
    return (
        <>
            <tr className="tokenhistory-tr">
                <td className="tokenhistory-td">{item.event}</td>
                <td className="tokenhistory-td">{item.price}</td>
                <td className="tokenhistory-td">{item.fromAddr}</td>
                <td className="tokenhistory-td">{item.toAddr}</td>
                <td className="tokenhistory-td">{item.createdAt}</td>
            </tr>



        </>
    )
};

export default Td;

