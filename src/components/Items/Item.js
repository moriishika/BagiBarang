import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
const Item = (props) => {
    const [isOpened, setOpenStatus] = useState(false);
    const [session, loading] = useSession();

    return (
        <div className="w-80 xl:w-2/5 my-5 p-0">
            <div className="pb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="MoriiUta.png" alt="gadis sange" className="w-12 rounded-full" />
                    <p className="ml-3 font-medium">{props.item.name}</p>
                </div>
                <button className="bg-white  py-1 px-3 rounded-xl shadow-lg font-medium">Laporkan</button>
            </div>
            <div className="flex-col justify-center">
                <div className="flex justify-center">
                    <img src={props.item.images["1"]} className="rounded-xl w-full object-cover object-center" alt={props.item.name}/>
                </div>
            <div className="flex w-full h-6 justify-center items-center">
                    <div className="w-3.5 bg-white border-black border-2 h-3.5 mx-1 mt-1 rounded-full"></div>
                    <div className="w-3.5 bg-black h-3.5 mx-1 mt-1 rounded-full"></div>
                    <div className="w-3.5 bg-black h-3.5 mx-1 mt-1 rounded-full"></div>
                    <div className="w-3.5 bg-black h-3.5 mx-1 mt-1 rounded-full"></div>
                    <div className="w-3.5 bg-black h-3.5 mx-1 mt-1 rounded-full"></div>
                </div>
            </div>
            <div>
                <h1 className="text-xl mt-2 font-semibold" >{props.item.name}</h1>
                <p>{props.item.description}</p>
                {isOpened && (
                    <h1>terbuka</h1>
                )}
            </div>
            <div className="flex w-full justify-between text-white text-3xl mt-4">
                <button className="bg-blue-400 w-1/6 p-2 rounded-md hover:bg-blue-700 duration-150 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" height="35px" viewBox="0 0 24 24" width="35px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg></button>
                {session && 
                    <button  onClick={() => isOpened ? setOpenStatus(false) : setOpenStatus(true)} className="bg-green-500 w-4/5 p-2 rounded-md hover:bg-green-700 duration-150">{isOpened ? 'Tutup' : 'Detail'}</button>
                }
                {!session && 
                    <Link href="/login">
                        <a className="bg-green-500 w-4/5 p-2 rounded-md hover:bg-green-700 duration-150 text-center">Detail</a>
                    </Link>
                }
            </div>
        </div>
    )

}

export default Item;