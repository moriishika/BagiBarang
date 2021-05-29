import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ItemForm = (props) => {
    const [inputs, setInputs] = useState({ name: '', description: '', province: '', address: '', phoneNumber: '', email: '' });
    const [imgFiles, setImgFiles] = useState([]);

    const onChangeHandler = ({ target }) => {
        const { name, value } = target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    const onFileChange = ({ target }) => {
        setImgFiles(target.files)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key of Object.keys(imgFiles)) {
            formData.append('itemImages', imgFiles[key])
        }
        axios.post('http://localhost:3000/api/items', { ...inputs, itemImages : imgFiles})
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(inputs)
        console.log(imgFiles)
    })


    return (
        <div className='bg-white'>
            <form onSubmit={onSubmitHandler} className="flex flex-col p-4">
                <div className="grid grid-cols-1 my-5 mx-7">
                    <div className='flex flex-col items-center justify-center w-full'>
                        <label className='flex flex-col border-4 border-dashed w-full h-36 hover:bg-gray-100 hover:border-green-300 group'>
                            <div className='flex flex-col items-center justify-center pt-7'>
                                <img className="w-12 h-12 rounded-full" src='asd' />
                                <p className='text-sm font-medium text-gray-600 group-hover:text-green-600 pt-1 tracking-wider'>Pilih Foto Barang</p>
                            </div>
                            <input type='file' className="hidden" name="itemPhotos" onChange={onFileChange} multiple />
                        </label>
                    </div>
                </div>
                <input type="text" name="name" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.name} onChange={onChangeHandler} placeholder="Nama Barang" />
                <textarea name="description" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.description} onChange={onChangeHandler} placeholder="Deskripsi" />
                <select name="province" onChange={onChangeHandler}>
                    <option value="" selected disabled>Pilih Wilayah</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bali">Bali</option>
                </select>
                <input type="text" name="address" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.address} onChange={onChangeHandler} placeholder="Alamat Barang Akan di Terima" />
                <input type="text" name="phoneNumber" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.phoneNumber} onChange={onChangeHandler} placeholder="Nomor Telepon / Whatsapp" />
                <input type="email" name="email" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.email} onChange={onChangeHandler} placeholder="Email" />
                <button>Simpan</button>
            </form>
        </div>

    )
}

export default ItemForm;