import React from 'react'
import { signIn, useSession} from 'next-auth/client'

const Item = (props) => {
    const [session, loading] = useSession();
    return (
        <div className="w-80 xl:w-2/5 my-5 p-0">
            <div className="pb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="MoriiUta.png" alt="gadis sange" className="w-12 rounded-full" />
                    <p className="ml-3 font-medium">{props.value.userName}</p>
                </div>
                <button className="bg-white  py-1 px-3 rounded-xl shadow-lg font-medium">Laporkan</button>
            </div>
            <div className="flex-col justify-center">
                <div className="flex justify-center">
                    <img src={props.value.imgUrl[0]} className="rounded-xl w-full object-cover object-center" alt="gadis sange" />
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
                <h1 className="text-xl mt-2 font-semibold" >{props.value.name}</h1>
                <p>{props.value.deskripsi}</p>
            </div>
            <div className="flex w-full justify-between text-white text-3xl mt-4">
                <button className="bg-blue-400 w-1/6 p-2 rounded-md hover:bg-blue-700 duration-150">Share</button>
                <button className="bg-green-500 w-4/5 p-2 rounded-md hover:bg-green-700 duration-150">Detail</button>
            </div>
        </div>
    )

}

export default Item;