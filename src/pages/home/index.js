import { TopNavbar, Items } from '../../components'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useCallback } from 'react'

const Home = () => {
    const [session, loading] = useSession()
    return (
        <main className="h-auto w-full">
            <TopNavbar></TopNavbar>
            {loading}
            {!session && (<>
                <h1>Please Sign in Here first</h1>
                <button onClick={() => { signIn() }}> Google Account</button>
            </>)}

            {session && (
                <>
                    <h1>You signed in as {session.user.name}</h1>
                    <p>{session.user.email}</p>
                    <img src={session.user.image} />
                    <button onClick={() => { signOut() }}>signOut</button>
                    <Items ></Items>
                </>
            )
            }

        </main>
    )
}

export default Home;