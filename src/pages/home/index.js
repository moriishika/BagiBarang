import { TopNavbar, Items } from '../../components'
import { signIn, signOut, useSession } from 'next-auth/client'

const Home = () => {
    const [session, loading] = useSession()
    return (
        <main className="h-auto w-full">
            <TopNavbar></TopNavbar>
            {!session && (<>
                <h1>Please Sign in Here first</h1>
                <button onClick={(e) => {e.preventDefault(); signIn()}}> Google Account</button>
            </>)}
            {session && (
                <>
                    <h1>You signed in as {session.user.name}</h1> 
                    <p>{session.user.email}</p>
                    <img src={session.user.image} />
                    <button onClick={(e) => {e.preventDefault(); singOut()}}>signOut</button>
                    <Items ></Items>
                </>
            )
            }

        </main>
    )
}

export default Home;