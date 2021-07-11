import React from 'react'

class TopNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.searchItems = this.searchItems.bind(this)
    }

    searchItems() {
        
    }

    render() {
        return (
            <div className="w-full flex justify-center bg-white sticky top-0 z-50">
                <div className=" w-11/12 xl:w-2/5 flex-col py-4 justify-betweem content-between">
                    <form >
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-2xl">Bagi Barang</h1>
                            {/* gonna be a Choose Location Component */}
                            <select className="py-0 px-1 w-36 xl:w-40 h-7 border-b-2 border-0">
                                <option>Pilih Wilayah</option>
                                <option>Bali</option>
                                <option>Jakarta</option>
                                <option>Jawa Barat</option>
                                <option>Jawa Timur</option>
                                <option>Jawa Tengah</option>
                            </select>
                        </div>
                        {/* Gonna be a search component */}
                        <input type="text" className="border-1 mt-3.5 py-3 pl-4 border-black focus:ring-0 focus:border-red-500 block w-full shadow-sm sm:text-sm rounded-md" placeholder="Mau nyari barang apa hari ini?" />
                    </form>
                </div>
            </div>
        );
    }
}

export default TopNavbar;