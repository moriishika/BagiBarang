import Head from 'next/head';

export default () => {
    return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
        <Head>Koneksi terputus</Head>
        <h1 className="font-bold text-4xl">Koneksi anda terputus 📶 </h1>
    </div>
    );
}