import Items from "../../../../models/Items";
import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import Cors from "cors";

const cors = Cors({
    methods : ['GET']
})

const handler = nextConnect();


handler.get(async (req, res) => {
  const session = getSession({ req });
  if (session) {
    try {
      const { userid } = req.query;
      const userItems = await Items.find({ user_id: userid }, (err, items) => {
        if (err) return console.log(err);
        return items;
      });

      res.status(200).json(userItems);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "failed to get items" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
});

export default handler;
