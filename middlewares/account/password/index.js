import { compare, hash } from "bcrypt";
import connection from "../../../database/connection";
import Account from "../../../database/models/account";

export const comparePasswords = async (plainText, encrypted) => {
  const match = await compare(plainText, encrypted);
  return match;
};

export const encryptPassword = async (plainText) => {
  try {
    const hashedPassword = await hash(plainText, 10);
    return hashedPassword;
  } catch (error) {
    return false;
  }
};

export const changeAccountPassword = async (req, res, token) => {
  try {
    const { accountId } = token;
    const { body } = req;

    if (!body.oldPassword || !body.newPassword || !body.confirmNewPassword) {
      return await res.status(400).json({ message: "Empty credentials." });
    }

    if (body.newPassword !== body.confirmNewPassword) {
      return await res.status(400).json({ message: "New password field doesn't match with confirm new password field." });
    }

    if (body.confirmNewPassword !== body.newPassword) {
      return await res.status(400).json({ message: "Confirm new password field doesn't match with new password field." });
    }

    if (body.newPassword.length < 8) {
      return await res.status(400).json({ message: "Password needs to be at least 8 characters long." });
    }

    const db = await connection();

    const found = await Account.findOne({ _id: accountId });
    const { password } = found;
    const match = await comparePasswords(body.oldPassword, password);

    if (!match) {
      return await res.status(400).json({ message: "Passwords dont match." });
    }

    const hashedNewPassword = await encryptPassword(body.newPassword);

    const filter = { _id: accountId };
    const update = { password: hashedNewPassword };
    await Account.findOneAndUpdate(filter, update);

    return await res.status(200).json({ message: "Password updated succesfully." });
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: "Server error. Try again." });
  }
};
