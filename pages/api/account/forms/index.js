import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../../../../database/connection";
import {
  verifyToken,
  verifyTokenServerSide,
} from "../../../../middlewares/authentication/jwt";
import { createForm, } from "../../../../middlewares/forms";

export default async function handler(req, res) {
  switch (req.method) {

    case "POST":
      const ctx = {req}
      const token = verifyTokenServerSide(ctx);

      if (!token) {
        return await res.status(403).json({ message: "" });
      }

      return await createForm(req, res, token);

      break;

    default:
      break;
  }
}
