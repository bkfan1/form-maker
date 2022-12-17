import {verifyToken} from "../../../../middlewares/authentication/jwt";
import { changeAccountEmail } from "../../../../middlewares/account/email";


export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await verifyToken(req, res, changeAccountEmail);

      break;

    default:
      return await res.status(405).json({ message: "" });
      break;
  }
}
