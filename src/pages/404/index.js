import Link from "next/link";
export default function Custom404() {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col justify-center items-center">
      <div className="flex">
        <h1 className="font-bold xl:text-6xl text-xl mr-2">
          Halaman ini enggak ada
        </h1>
        <span className="xl:text-6xl text-xl"> 😭</span>
      </div>
      <Link href="/">
        <a className="xl:mt-8 mt-4 xl:text-md hover:bg-transparent block border text-lg xl:text-4xl p-2 xl:p-4  w-60 text-center hover:border-green-500 rounded-md text-white hover:text-green-500 font-bold bg-green-500 ">
          Kembali
        </a>
      </Link>
    </div>
  );
}
