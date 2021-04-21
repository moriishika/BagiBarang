import React from 'react'
import Item from './Item'
class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsData: [{
                userId: "10",
                userName: "Morii Shikaa",
                barangId: "1",
                name: "Figure gadis kecanduan judi",
                deskripsi: "ini figur gratis buat kamu wibu bau bawang yang sangat menggangu dunia akhirat dan dunia dunaiawi",
                imgUrl: ["61ev4nvYOTL.jpg","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png"],
                whatsapp: "087123456789",
                email: "moriishika@gmail.com"
            },
            {
                userId: "13",
                userName: "Kang Den Il",
                barangId: "2",
                name: "Figure Kotori",
                deskripsi: "ini figur gratis buat kamu wibu bau bawang yang sangat menggangu dunia akhirat dan dunia dunaiawi",
                imgUrl: ["unnamed.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png"],
                whatsapp: "087333333333",
                email: "kangdenilofficalstars@gmail.com"
            },
            {
                userId: "1",
                userName: "Agud",
                barangId: "4",
                name: "PS Vita",
                deskripsi: "ini psvita buat rama asiks",
                imgUrl: ["kotori.jpg","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png"],
                whatsapp: "08728882282",
                email: "agudjayax@gmail.com"
            },

            {
                userId: "2",
                userName: "Yorushika",
                barangId: "7",
                name: "Album Yorushika Terbaru",
                deskripsi: "album buat rama fans no 1 tiada tara",
                imgUrl: ["kotori2.jpg","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png"],
                whatsapp: "081313131313",
                email: "yorushikaofficial@gmail.com"
            },
            {
                userId: "6",
                userName: "Morii Aimi",
                barangId: "6",
                name: "Bunga special",
                deskripsi: "bunga untuuk rama",
                imgUrl: ["MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png","MoriiUta.png"],
                whatsapp: "0803061997",
                email: "moriiaimi@gmail.com"
            }],
            isDetailOpened: false
        }
    }

    // getItemData() {
    //     const itemsData = [
    //         {
    //             userId: "10",
    //             userName: "Morii Shikaa",
    //             barangId: "1",
    //             name: "Figure gadis kecanduan judi",
    //             deksripsi: "ini figur gratis buat kamu wibu bau bawang yang sangat menggangu dunia akhirat dan dunia dunaiawi",
    //             imgUrl: ["MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png"],
    //             whatsapp: "087123456789",
    //             email: "moriishika@gmail.com"
    //         },
    //         {
    //             userId: "13",
    //             userName: "Kang Den Il",
    //             barangId: "2",
    //             name: "Figure Kotori",
    //             deksripsi: "ini figur gratis buat kamu wibu bau bawang yang sangat menggangu dunia akhirat dan dunia dunaiawi",
    //             imgUrl: ["MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png"],
    //             whatsapp: "087333333333",
    //             email: "kangdenilofficalstars@gmail.com"
    //         },
    //         {
    //             userId: "1",
    //             userName: "Agud",
    //             barangId: "4",
    //             name: "PS Vita",
    //             deksripsi: "ini psvita buat rama asiks",
    //             imgUrl: ["MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png"],
    //             whatsapp: "08728882282",
    //             email: "agudjayax@gmail.com"
    //         },

    //         {
    //             userId: "2",
    //             userName: "Yorushika",
    //             barangId: "7",
    //             name: "Album Yorushika Terbaru",
    //             deksripsi: "album buat rama fans no 1 tiada tara",
    //             imgUrl: ["MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png"],
    //             whatsapp: "081313131313",
    //             email: "yorushikaofficial@gmail.com"
    //         },
    //         {
    //             userId: "6",
    //             userName: "Morii Aimi",
    //             barangId: "6",
    //             name: "Bunga special",
    //             deksripsi: "bunga untuuk rama",
    //             imgUrl: ["MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png,MoriiUta.png"],
    //             whatsapp: "0803061997",
    //             email: "moriiaimi@gmail.com"
    //         }
    //     ]
    //     this.setState({ itemsData });
    //     console.log(this.state.itemsData);
    // }

    render() {
        const datadataitem = this.state.itemsData;
        const items = datadataitem.map((item) => {
            return <Item key = {item.barangId} value={item} onClick={this.getItemData}></Item>
        })

        return (
            <div className="grid grid-cols-1 place-items-center w-full">
                {items}
            </div>
        );
    }
}

export default Items;