import Items from '../../../models/Items';
export default async function handler(req, res){
    Items.find((err, items)=> {
        if (err) return console.error(err);
        res.status(200).json({items})
    })
}