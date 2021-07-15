import React, { useState } from 'react';
import Item from './Item';

function Items({ items, searchedItems }) {
    return (
        <div  className="flex flex-col items-center">
            <div className="flex flex-col w-11/12 xl:w-2/5 items-center">
                {!items && <h1 >Lagi loading</h1>}

                {searchedItems && searchedItems.length && searchedItems.map((item, index)=> {
                    return <Item item={item} key={item._id}></Item>
                })}

                {items && !searchedItems && JSON.parse(items).map((item, index) => {
                    return <Item item={item} key={item._id}></Item>
                })}
            </div>
        </div>
    );

}
// grid grid-cols-1 place-items-center

export default Items;