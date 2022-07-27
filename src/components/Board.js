import React, { useState, useRef, forwardRef,useEffect } from "react";
import axios from 'axios';
import Tr from "./base/Tr";
axios.defaults.withCredentials = true;

const Board = () => {
    const [info, setInfo] = useState([]);
    const [selected, setSelected] = useState('');
    const [modalOn, setModalOn] = useState(false);

    const nextId = useRef(11);

    useEffect(() => {
        axios.get('/api/NFT/Ethereum/tokenhistory')
            .then((res) => {
                setInfo(res.data);
            }).catch((err) => {
                console.log(err);
        })
    }, []);

    return (
        <div>
            <table className="tokenhistory-table">
                <thead className="tokenhistory-thead">
                <tr className="tokenhistory-tr">
                <th className="thead-text">Event</th>
                <th className="thead-text">Price</th>
                <th className="thead-text">From</th>
                <th className="thead-text">To</th>
                <th className="thead-text">Date</th>
                </tr>
            </thead>
        <Tr Info={info} />
            </table>
        </div>
    );
};

export default Board;