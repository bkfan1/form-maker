import { verifyToken } from "../../../../../middlewares/authentication/jwt";
import { sendFormInvitation } from "../../../../../middlewares/forms";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await verifyToken(req, res, sendFormInvitation);

      break;

    default:
      return await res.status(405).json({ message: "" });
      break;
  }
}
