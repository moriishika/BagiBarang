import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link';
const TopNavbar = ({ search }) => {
  const { register, handleSubmit, getValues } = useForm();
  //needs to change with only one handler and one state
  const [keywords, setKeyword] = useState("");
  const [province, setProvince] = useState("");

  const searchItem = () => {
    search(keywords, province);
  };

  useEffect(() => {
    //this condition is unnecessary
    search(keywords ? keywords : "", province ? province : "");
  }, [keywords, province]);

  return (
    <div className="w-full flex justify-center bg-white sticky top-0 z-50">
      <div className=" w-11/12 xl:w-2/5 flex-col py-4">
        <form onSubmit={handleSubmit(searchItem)}>
          <div className="flex justify-between items-center">
            <Link href='/' ><a className="font-bold text-2xl">Bagi Barang</a></Link>
            <div className="relative inline-block text-gray-700">
              <select
                className="w-36 h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                {...register("province")}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option hidden value="">
                  Pilih Wilayah
                </option>
                <option value="">Semua Wilayah</option>
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
                <option value="Kepulauan Bangka Belitung">
                  Kepulauan Bangka Belitung
                </option>
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
          </div>
          <input
            type="text"
            {...register("keywords")}
            value={keywords}
            onChange={(e) => setKeyword(e.target.value)}
            className="border-1 mt-3.5 py-3 pl-4 border-black focus:ring-0 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
            placeholder="Mau nyari barang apa hari ini?"
          />
        </form>
      </div>
    </div>
  );
};

export default TopNavbar;
