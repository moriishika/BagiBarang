import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const TopNavbar = ({ search }) => {
    const { register, handleSubmit } = useForm();

    const searchItems = (data) => {
        search(data.keywords.toLowerCase())
    }

    return (
        <div className="w-full flex justify-center bg-white sticky top-0 z-50">
            <div className=" w-11/12 xl:w-2/5 flex-col py-4 justify-betweem content-between">
                <form onSubmit={handleSubmit(searchItems)}>
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl">Bagi Barang</h1>
                        {/* Soon able to be a component */}
                        <select {...register('province')} className="py-0 px-1 w-36 xl:w-40 h-7 border-b-2 border-0">
                            <option hidden>Pilih Wilayah</option>
                            <option value="Aceh">Aceh</option>
                            <option value="Bali">Bali</option>
                            <option value="Banten">Banten</option>
                            <option value="Bengkulu">Bengkulu</option>
                            <option value="Di Yogyakarta">Di Yogyakarta</option>
                            <option value="Dki Jakarta">Dki Jakarta</option>
                            <option value="Gorontalo">Gorontalo</option>
                            <option value="Jambi">Jambi</option>
                            <option value="Jawa Barat">Jawa Barat</option>
                            <option value="Jawa Tengah">Jawa Tengah</option>
                            <option value="Jawa Timur">Jawa Timur</option>
                            <option value="Kalimantan Barat">Kalimantan Barat</option>
                            <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                            <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                            <option value="Kalimantan Timur">Kalimantan Timur</option>
                            <option value="Kalimantan Utara">Kalimantan Utara</option>
                            <option value="Kepulauan Bangka Belitung">Kepulauan Bangka Belitung</option>
                            <option value="Kepulauan Riau">Kepulauan Riau</option>
                            <option value="Lampung">Lampung</option>
                            <option value="Maluku Utara">Maluku Utara</option>
                            <option value="Maluku">Maluku</option>
                            <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                            <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                            <option value="Papua Barat">Papua Barat</option>
                            <option value="Papua">Papua</option>
                            <option value="Riau">Riau</option>
                            <option value="Sulawesi Barat">Sulawesi Barat</option>
                            <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                            <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                            <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                            <option value="Sulawesi Utara">Sulawesi Utara</option>
                            <option value="Sumatera Barat">Sumatera Barat</option>
                            <option value="Sumatera Selatan">Sumatera Selatan</option>
                            <option value="Sumatera Utara">Sumatera Utara</option>
                        </select>
                    </div>
                    <input type="text" {...register('keywords')} className="border-1 mt-3.5 py-3 pl-4 border-black focus:ring-0 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md" placeholder="Mau nyari barang apa hari ini?" />
                </form>
            </div>
        </div>
    );
}

export default TopNavbar;
