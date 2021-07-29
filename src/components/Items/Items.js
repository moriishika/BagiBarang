import Item from './Item';

function Items({ items, searchedItems, inProfile }) {
    return (
        <div  className="flex flex-col items-center min-h-full">
            <div className="flex flex-col-reverse w-11/12 xl:w-2/5 items-center">
                {!items && <h1 >Lagi loading</h1>}

                {searchedItems && searchedItems.length && searchedItems.map((item)=> {
                    return <Item item={item} key={item._id} inProfile={inProfile}></Item>
                })}

                {items && !searchedItems && items.map((item) => {
                    return <Item item={item} key={item._id} inProfile={inProfile}></Item>
                })}
            </div>
        </div>
    );
}

export default Items;