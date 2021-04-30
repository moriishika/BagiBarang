import Items from '../../models/Items.js';
export default async function handler(req, res){
    Items.find((err, items)=> {
        if (err) return console.error(err);
        res.status(200).json({items})
    })
    
}