import Items from '../../../models/Items';
import parseMultipartForm from '../../../libs/multipartFormParser';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';

const handler = nextConnect();

handler.use(parseMultipartForm);

// this api needs auth, so no one will able to save data without login 
handler.post(async (req, res) => {
    
    const session = await getSession({ req });
    if (session) {
        try {
            console.log('masuk post')
            //contains image name
            const files = req.files.images.map(image => image.name);
            //contains inputs value from uploadItem form
            const body = req.body;
            //contains the logged in user data

            const user = session.user;

            // creating new instance of Items and save it to the database
            const item = new Items({ ...body, images: files, user });
            await item.save();

            //if success it's gonna send a json with the item data
            res.status(200).json(item);
            console.log('masuk')
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        }
    } else {
        res.status(401).json({ message: "Please Log In" })
    }

    //to get all items 
}).get((req, res) => {
    Items.find((err, items) => {
        if (err) return console.error(err);
        res.status(200).json({ items })
    })
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;