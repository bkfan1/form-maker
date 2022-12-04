import { verifyToken } from "../../../middlewares/authentication/jwt";
import { registerAccount } from "../../../middlewares/register";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await registerAccount(req, res);

    default:
      return await res.status(405).json({ message: "" });
  }
}
