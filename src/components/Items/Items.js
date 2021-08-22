import Item from "./Item";
function Items({ items, searchedItems, inProfile, uploaderId }) {
  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="flex flex-col w-11/12 xl:w-2/5 items-center">
        {searchedItems &&
          searchedItems.length &&
          searchedItems.map((item) => {
            return (
              <Item
                item={item}
                key={item._id}
                inProfile={inProfile}
                uploaderId={uploaderId}
              ></Item>
            );
          })}

        {items &&
          !searchedItems &&
          items.map((item, index) => {
            return (
              <Item
                item={item}
                key={item._id}
                inProfile={inProfile}
                uploaderId={uploaderId}
              ></Item>
            );
          })}
      </div>
    </div>
  );
}

export default Items;
