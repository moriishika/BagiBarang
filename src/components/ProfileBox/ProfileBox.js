import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';


const ProfileBox = () => {
    const [session, loading] = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        let formData = new FormData();

        for (const input in data) {
            formData.append(`${input}`, data[input]);
        }

        axios.put('http://localhost:3000/api/signup', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => console.log("error disiniiiiii",err))
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="grid grid-cols-1 mt-5 mx-7">
                    <div className='flex flex-col items-center justify-center w-full'>
                        <label className='flex flex-col border-4 border-dashed w-full h-36 hover:bg-gray-100 hover:border-green-300 group'>
                            <div className='flex flex-col items-center justify-center pt-7'>
                                {session ? <img className="w-12 h-12 rounded-full" src={session.user.image} /> : <svg className="w-12 h-12 text-green-500 group-hover:text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>}

                                <p className='text-sm font-medium text-gray-500 group-hover:text-green-600 pt-1 tracking-wider'>{session ? 'Ganti Photo Profil' : 'Pilih Photo Profil'}</p>
                            </div>
                            <input type='file' className="hidden" {...register('images')} multiple/>
                        </label>
                    </div>
                </div>
                <div className="p-4 w-full mt-2">
                    <input type="text" {...register('name', { required: true, minLength: 5, maxLength: 40 })} placeholder="Nama" className="mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" />
                    {errors.name?.type === 'required' && "Tolong isi nama anda"}
                    {errors.name?.type === 'minLength' && "Minimal 5 huruf"}
                    {errors.name?.type === 'maxLength' && "Maksimal 40 huruf"}

                    <input type="text" {...register('phoneNumber', { required: true, pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ })} placeholder="Nomer Telepon / Whatsapp" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" />
                    {errors.phoneNumber?.type === 'required' && "Tolong isi nomor telepon / whatsapp anda"}
                    {errors.phoneNumber?.type === 'pattern' && "Format nomor salah, Contoh : 085-123-456-789"}


                    <input type="email" {...register('email', { required: true, pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })} placeholder="Email" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" />
                    {errors.phoneNumber?.type === 'required' && "Tolong isi alamat email anda"}
                    {errors.email?.type === 'pattern' && "Format email salah, Contoh : emailanda@gmail.com"}

                    <select {...register('province', { required: true })} className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3 ">
                        <option hidden value="">Pilih Wilayah</option>
                        <option value="jakarta">Jakarta</option>
                        <option value="bali">Bali</option>
                    </select>
                    {errors.province?.type === 'required' && "Tolong pilih wilayah anda"}

                    <input type="text" {...register('address', { required: true, minLength: 5 })} placeholder="Alamat yang jelas" className="mt-4 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" multiple />
                    {errors.address?.type === 'required' && "Tolong beri alamat anda"}
                    {errors.address?.type === 'minLength' && "Minimal 5 huruf"}

                    <button type="submit" className="hover:bg-transparent block border border-blue-500 w-full py-2 rounded-md mt-4 text-white hover:text-blue-500 font-semibold hover bg-blue-500 ">Simpan</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileBox;