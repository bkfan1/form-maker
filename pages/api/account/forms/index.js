import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import connection from "../../../../database/connection";
import account from "../../../../database/models/account";
import { verifyToken } from "../../../../middlewares/authentication/jwt";
import { createForm, getAccountForms } from "../../../../middlewares/forms";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return await verifyToken(req, res, getAccountForms);
    }

    case "POST":
      const { cookie } = req.headers;
      if (!cookie) {
        return await res.status(403).json({ message: "" });
      }

      const parsedCookie = parse(cookie);
      const { authToken } = parsedCookie;

      if (!authToken) {
        return await res.status(403).json({ message: "" });
      }

      verify(
        authToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return await res.status(500).json({ message: "" });
          }

          const { accountId } = decoded;

          const db = await connection();

          const found = await account.findOne({ _id: accountId });

          if (!found) {
            return await res.status(404).json({ message: "" });
          }

          const { forms } = found;
          const updatedForms = [...forms, req.body];

          const filter = { _id: accountId };
          const update = { forms: updatedForms };

          await account.findOneAndUpdate(filter, update, { new: true });

          return await res.status(200).json({ message: "" });
        }
      );

      break;

    default:
      break;
  }
}
