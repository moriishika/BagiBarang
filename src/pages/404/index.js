import Link from 'next/link'
export default function Custom404() {
    return (
        <div className="min-h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
            <h1 className="font-bold xl:text-6xl text-xl">Halaman ini enggak ada 😭</h1>
            <Link href='/'><a className="xl:mt-8 mt-4 xl:text-md hover:bg-transparent block border text-lg xl:text-4xl p-2 xl:p-4  w-60 text-center hover:border-green-500 rounded-md text-white hover:text-green-500 font-bold bg-green-500 ">Kembali</a></Link>
        </div>
    )
}  