import { getSession } from "next-auth/client";

export default async function isAuthorized(req, res, next) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Unathorized Access", status: "UNATHORIZED_ACCESS" });
  }
  next();
}
