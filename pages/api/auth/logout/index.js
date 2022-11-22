import { verifyToken } from "../../../../middlewares/authentication/jwt";
import { handleLogout } from "../../../../middlewares/authentication/logout";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return await verifyToken(req, res, handleLogout);

      break;

    default:
      return await res.status(405).json({ message: "" });
      break;
  }
}
