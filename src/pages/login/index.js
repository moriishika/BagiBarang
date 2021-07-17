import React from "react";
import Link from "next/link";
import { signIn } from 'next-auth/client';
const Login = () => {
    return (
        <div>
            <div className="bg-white h-20 flex justify-items-center">
                <Link href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </Link>
            </div>
            <div className="w-11/12 xl:w-2/5 p-4 flex flex-col justify-center justify-items-center mx-auto">
                <h1 className="text-center my-4 font-semibold text-lg">Mau Barang? <br></br>Login Dulu Dong Gak lama kok</h1>
                <div className="flex flex-col mt-6">
                    <button onClick={() => { signIn('google') }} className="text-center my-1 bg-red-500 text-white p-2 font-medium rounded-md hover:bg-red-600">Masuk dengan Google</button>
                    <button onClick={() => { signIn('facebook') }} className="text-center my-1 bg-blue-500 text-white p-2 font-medium rounded-md hover:bg-blue-600">Masuk dengan Facebook</button>
                </div>
            </div>
        </div>
    );
}
export default Login;