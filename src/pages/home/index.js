import { TopNavbar, Items, BottomNavbar } from '../../components';

const Home = ({ items }) => {
    
    return (
        <main className="h-auto w-full">
            <TopNavbar></TopNavbar>
            <Items items={items}></Items>
            <BottomNavbar></BottomNavbar>
        </main>
    )
}
export default Home;