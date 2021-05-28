import { TopNavbar, Items, BottomNavbar} from '../../components';

const Home = () => {
    return (
        <main className="h-auto w-full">
            <TopNavbar></TopNavbar>

            <Items ></Items>
            <BottomNavbar></BottomNavbar>
        </main>
    )
}

export default Home;