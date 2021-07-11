import nextConnect from 'next-connect';
import { User } from '../../../models';
import parseMultipartForm from '../../../libs/multipartFormParser';

const handler = nextConnect();
 
handler.use(parseMultipartForm);

handler.put((req, res) => {
    try {

        if (req.files) {
            console.log('masuk')
            console.log(req.files)
        }

        //contains inputs value from signup form
        console.log(req.files)
        const body = req.body;

        // creating new instance of Items and save it to the database
        //if success it's gonna send a json with the item data
        res.status(200).json({ message: 'success' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
    // User.phoneNumber =
})

export const config = {
    api: {
        bodyParser: false
    }
}


// const profilePhoto = req.files.itemImages.map(image => image.name);
//             console.log('masuk ada', body, profilePhoto);

export default handler;