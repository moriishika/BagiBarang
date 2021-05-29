import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
function  Items ()  {
    const [itemsData, setItemsData] = useState([]);


    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('http://localhost:3000/api/items',{
            cancelToken : source.token
        })
        .then( item => {
            setItemsData(item.data.items)
        })
        .catch(err => console.error(err));
    }, [])

    return (
        <div className="grid grid-cols-1 place-items-center w-full">
            {!itemsData && <h1 >Lagi loading</h1>}
            {itemsData && itemsData.map((item) => {
                return <Item key={item.barangId} item={item}></Item>
            })}
        </div>
    );

}

export default Items;