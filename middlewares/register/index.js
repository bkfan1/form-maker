import connection from "../../database/connection";
import { hash } from "bcrypt";
import Account from "../../database/models/account";
import { fullname, email } from "../../utils/regex";

export const registerAccount = async (req, res) => {
  const db = await connection();

  console.log(req.headers.cookie)

  const { body } = req;

  if (!body.fullname || !body.email || !body.password) {
    return await res.status(400).json({ message: "" });
  }

  if (!fullname.test(body.fullname)) {
    return await res.status(400).json({ message: "" });
  }

  if (!email.test(body.email)) {
    return await res.status(400).json({ message: "" });
  }

  if (body.password.length < 8) {
    return await res.status(400).json({ message: "" });
  }

  const results = await Account.findOne({ email: body.email });
  if (results) {
    return await res.status(400).json({ message: "" });
  }

  let hashedPassword;

  try {
    hashedPassword = await hash(body.password, 10);
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }

  try {
    const newAccount = await Account.create({
      fullname: body.fullname,
      email: body.email,
      password: hashedPassword,

      createdAt: new Date(),
    });

    return await res.status(200).json({ message: "" });
  } catch (error) {
    return await res.status(500).json({ message: "" });
  }
};
