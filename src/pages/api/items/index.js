import Items from '../../../models/Items';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log(req.body.address)
            const { name, description, province, address, phoneNumber, email, itemImages } = req.body;
            console.log( name, description, province, address, phoneNumber, email, itemImages )
            const item = new Items({
                name,
                description,
                province : province,
                address : address,
                phoneNumber : phoneNumber,
                email : email,
                images: itemImages
            })

            await item.save();
            res.status(200).json(item);
        }
        catch (err) {
            res.status(400).json({message : err});
        }
    } else {
        Items.find((err, items) => {
            if (err) return console.error(err);
            res.status(200).json({ items })
        })
    }
}