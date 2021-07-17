import { useRouter } from 'next/router';
import Head from 'next/head';
import ItemModel from '../../models/Items';
import Image from 'next/image';

const Item = (props) => {
    const router = useRouter()
    const { id } = router.query

    const item = JSON.parse(props.item);


    return (
        <div>
            <Head>
                <title>{item.name}</title>
            </Head>

            <main>
                <h1>{item.name}</h1>
                <div className="w-48 h-72 relative">
                    <Image layout="fill" src={`/assets/images/items/${item.images[0]}`}></Image>
                </div>
                <h1 className="font-bold text-red-600">{item.name}</h1>
            </main>
        </div>
    );
}

export default Item;

export async function getStaticProps({ params }) {

    const data = await ItemModel.findById(params.id, (err, item) => {
        if (err) return console.log(err);
        return item;
    });


    return {
        props: {
            item: JSON.stringify(data)
        }
    }
}

export async function getStaticPaths() {
    const data = await ItemModel.find((err, items) => {
        if (err) return console.log(err);
        return items;
    })

    const paths = data.map((item) => {
        return { params: { id: String(item._id) } }
    })

    return {
        paths,
        fallback: false
    }
}