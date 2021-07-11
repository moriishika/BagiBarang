import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';

const ItemForm = (props) => {
    const [imgFiles, setImgFiles] = useState([]);
    const [session, loading] = useSession();
    const [inputs, setInputs] = useState({ name: '', description: '', province: '', address: '', phoneNumber: '', email: '' });

    //refactor kode yang ini, sebenernya perlu inputs aja img file nya ga perlu
    const onChangeHandler = ({ target }) => {
        const { name, value } = target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    }

    const onFileChange = ({ target }) => {
        setImgFiles(target.files)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (const input in inputs) {
            formData.append(input, inputs[input]);
        }

        for (const imgFile in imgFiles) {
            formData.append('images', imgFiles[imgFile]);
        }

        axios.post('http://localhost:3000/api/items', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setInputs(session ? { province: session.user.province, address: session.user.address, phoneNumber: session.user.phoneNumber, email: session.user.email} : {});
    }, [loading])

    return (
        <div className='bg-white'>
            <form onSubmit={onSubmitHandler} className="flex flex-col p-4" encType="multipart/form-data">
                <div className="grid grid-cols-1 my-5 mx-7">
                    <div className='flex flex-col items-center justify-center w-full'>
                        <label className='flex flex-col border-4 border-dashed w-full h-36 hover:bg-gray-100 hover:border-green-300 hover:fill-current hover:text-green-600 group'>
                            <div className='flex flex-col items-center justify-center pt-7'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M20,2H4C3,2,2,2.9,2,4v3.01C2,7.73,2.43,8.35,3,8.7V20c0,1.1,1.1,2,2,2h14c0.9,0,2-0.9,2-2V8.7c0.57-0.35,1-0.97,1-1.69V4 C22,2.9,21,2,20,2z M19,20H5V9h14V20z M20,7H4V4h16V7z"/><rect height="2" width="6" x="9" y="12"/></g></g></svg>
                                <p className='text-sm font-medium text-gray-600 group-hover:text-green-600 pt-1 tracking-wider'>Pilih Foto Barang</p>
                            </div>
                            <input type='file' className="hidden" name="itemPhotos" onChange={onFileChange} multiple />
                        </label>
                    </div>
                </div>
                <input type="text" name="name" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.name} onChange={onChangeHandler} placeholder="Nama Barang" />
                <textarea name="description" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.description} onChange={onChangeHandler} placeholder="Deskripsi" />
                <select name="province" onChange={onChangeHandler} className="rounded-md">
                    <option hidden value="">Pilih Wilayah</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bali">Bali</option>
                </select>
                <input type="text" name="address" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.address} onChange={onChangeHandler} placeholder="Alamat Barang Akan di Terima" />
                <input type="text" name="phoneNumber" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.phoneNumber} onChange={onChangeHandler} placeholder="Nomor Telepon / Whatsapp" />
                <input type="email" name="email" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" value={inputs.email} onChange={onChangeHandler} placeholder="Email" />
                <button className="w-full bg-blue-400 h-12 rounded-lg text-white font-bold hover:bg-blue-600" >Simpan</button>
            </form>
        </div>

    )
}

export default ItemForm;