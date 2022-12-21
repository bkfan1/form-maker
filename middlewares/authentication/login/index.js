import connection from "../../../database/connection";
import Account from "../../../database/models/account";
import { email } from "../../../utils/regex";
import { compare } from "bcrypt";
import { createToken } from "../jwt";
import { serialize } from "cookie";

export const handleLogin = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return await res.status(400).json({ message: "Empty credentials." });
  }

  if (!email.test(body.email)) {
    return await res.status(400).json({ message: "Invalid email." });
  }
  if (body.password.length < 8) {
    return await res.status(400).json({ message: "Invalid password." });
  }

  const db = await connection();

  const found = await Account.findOne({ email: body.email });

  if (!found) {
    return await res.status(404).json({ message: "Account doesn't exists." });
  }

  try {
    let equal = await compare(body.password, found.password);

    if (!equal) {
      return await res.status(400).json({ message: "Passwords dont match." });
    }

    const claims = { sub: "logged", accountId: found._id };
    const options = { expiresIn: "24h" };
    const jwt = createToken(claims, process.env.ACCESS_TOKEN_SECRET, options);

    const cookie = serialize("authToken", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    return await res.status(200).json({ accountName: found.fullname, message:"Logged sucessfully." });
  } catch (error) {
    return await res.status(500).json({ message: "Server error." });
  }
};
