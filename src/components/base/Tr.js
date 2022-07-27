import React from "react";
import Td from "./Td";

const Tr = ({info}) => {
    return(
        <tbody>
        {
            info.map(item => {
                return (
                    <Td key={item.id} item={item} />
                )
            })
        }


        </tbody>
    )
}

export default Tr;