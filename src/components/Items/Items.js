import Item from "./Item";
function Items({ items, inProfile, uploaderId, keywords, province }) {
  return (
    <div className="flex flex-col items-center  min-h-screen">
      <div className="flex flex-col w-11/12 lg:w-5/6 xl:w-2/5  items-center">
        {!items.length && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-medium text-xl">
              Hmmm belum ada yang bagi barang 
            </h2>
            {keywords && <h1 className="font-bold text-2xl mt-2">"{keywords}"</h1>}
            {province && <h3 className="text-xl font-medium mt-2">di <span className="font-semibold">{province}</span></h3>}
            <span className="text-7xl mt-4">😢</span>
          </div>
        )}

        {items &&
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
