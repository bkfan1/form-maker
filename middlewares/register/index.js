import connection from "../../database/connection";
import Account from "../../database/models/account";
import { fullname, email } from "../../utils/regex";
import { encryptPassword } from "../account/password";

export const registerAccount = async (req, res, token) => {
  if (token) {
    return await res.status(403).json({ message: "You already log in." });
  }

  const { body } = req;

  if (!body.fullname || !body.email || !body.password) {
    return await res.status(400).json({ message: "Empty credentials." });
  }

  if (!fullname.test(body.fullname)) {
    return await res.status(400).json({ message: "Invalid fullname." });
  }

  if (!email.test(body.email)) {
    return await res.status(400).json({ message: "Invalid email." });
  }

  if (body.password.length < 8) {
    return await res.status(400).json({ message: "Invalid password." });
  }

  try {
    const db = await connection();

    const results = await Account.findOne({ email: body.email });
    if (results) {
      return await res.status(400).json({ message: "Account already exists." });
    }

    const hashedPassword = await encryptPassword(body.password);

    const newAccount = await Account.create({
      fullname: body.fullname,
      email: body.email,
      password: hashedPassword,

      createdAt: new Date(),
    });

    return await res.status(200).json({ message: "Registered successfully." });
  } catch (error) {
    return await res.status(500).json({ message: "Server error." });
  }
};
