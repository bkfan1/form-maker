import { verifyToken } from "../../../../middlewares/authentication/jwt";
import { handleLogin } from "../../../../middlewares/authentication/login";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await handleLogin(req, res);

    default:
      return await res.status(405).json({ message: "" });
      break;
  }
}
