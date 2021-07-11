import Home from './home';
import Head from 'next/head';
import ItemsModel from '../models/Items';

const Index = ({ items }) => {
    return (
        <>
            <Head>
                <title>Bagi Barang</title>
            </Head>
            <Home items={items}></Home>
        </>
    );
}

export async function getStaticProps() {
    const items = await ItemsModel.find((err, items) => {
        if (err) return console.error(err);
        return items;
    });
    

    return {
        props: {
            items: JSON.stringify(items)
        }
    }



}
export default Index;
