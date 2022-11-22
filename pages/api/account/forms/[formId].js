import { verifyToken } from "../../../../middlewares/authentication/jwt";
import {
  updateUniqueForm,
  deleteUniqueForm,
} from "../../../../middlewares/forms";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT": {
      return await verifyToken(req, res, updateUniqueForm);
      break;
    }

    case "DELETE": {
      return await verifyToken(req, res, deleteUniqueForm);
      break;
    }

    default:
      return await res.status(405).json({ message: "" });
      break;
  }
}
