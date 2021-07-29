import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
const BottomNavbar = (props) => {
    const [session, loading] = useSession();
    return (
        <div className={"w-full flex justify-center bg-white bottom-0 py-3 sticky z-50"}>
            <Link href="/">
                <div className="flex flex-col items-center cursor-pointer">
                    <a><img src="/assets/icons/home.svg" className="w-10 h-10" /></a>
                    <p className="font-semibold">Beranda</p>
                </div>
            </Link>

            <Link href={session ? '/uploaditem' : '/login'}>
                <div className="flex flex-col  items-center mx-8 cursor-pointer">
                    <a><img src="/assets/icons/handpackage.svg" className="w-10 h-10" /></a>
                    <p className="font-semibold">Bagi Barangmu</p>
                </div>
            </Link>

            <Link href={session ? '/profile' : '/login'}>
                <div className="flex flex-col  items-center cursor-pointer">
                    <a><img src={session ?  session.user.image : '/assets/icons/circleacc.svg'} className="w-10 h-10 rounded-full" /></a>
                    <p className="font-semibold">Profil</p>
                </div>
            </Link>
        </div>
    );

}



export default BottomNavbar;