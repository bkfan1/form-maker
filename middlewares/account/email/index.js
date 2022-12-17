import connection from "../../../database/connection";
import Account from "../../../database/models/account";
import { email } from "../../../utils/regex";

export const changeAccountEmail = async (req, res, token) => {
  try {
    const { accountId } = token;

    const { body } = req;

    if (!body.newEmail || !body.confirmNewEmail) {
      return await res.status(400).json({ message: "" });
    }

    if (body.newEmail !== body.confirmNewEmail) {
      return await res.status(400).json({ message: "" });
    }

    if (body.confirmNewEmail !== body.newEmail) {
      return await res.status(400).json({ message: "" });
    }

    if (!email.test(body.newEmail) || !email.test(body.confirmNewEmail)) {
      return await res.status(400).json({ message: "" });
    }

    const db = await connection();

    const filter = { _id: accountId };
    const update = { email: body.newEmail };

    const found = await Account.findOneAndUpdate(filter, update);
    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};
