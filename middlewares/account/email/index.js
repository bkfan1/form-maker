import connection from "../../../database/connection";
import Account from "../../../database/models/account";
import { email } from "../../../utils/regex";

export const changeAccountEmail = async (req, res, token) => {
  if (!token) {
    return await res.status(403).json({ message: "" });
  }
  const { accountId } = token;
  try {
    const { body } = req;

    if (!body.newEmail || !body.confirmNewEmail) {
      return await res.status(400).json({ message: "Empty credentials." });
    }

    if (body.newEmail !== body.confirmNewEmail) {
      return await res
        .status(400)
        .json({
          message: "New email value doesn't match with confirm email value.",
        });
    }

    if (body.confirmNewEmail !== body.newEmail) {
      return await res
        .status(400)
        .json({
          message:
            "Confirm new email value doesn't match with new email value.",
        });
    }

    if (!email.test(body.newEmail)) {
      return await res.status(400).json({ message: "Invalid new email." });
    }

    if (!email.test(body.confirmNewEmail)) {
      return await res
        .status(400)
        .json({ message: "Invalid confirm new email." });
    }

    const db = await connection();

    const filter = { _id: accountId };
    const update = { email: body.newEmail };

    const found = await Account.findOneAndUpdate(filter, update);
    return await res
      .status(200)
      .json({ message: " Email updated succesfully" });
  } catch (error) {
    return await res.status(500).json({ message: "Server error. Try again." });
  }
};
