import { parse } from "cookie";
import { sign, verify } from "jsonwebtoken";

export const createToken = (claims, secret, options) => {
  if (!claims) {
    throw Error("No claims were provided.");
  }
  if (!secret) {
    throw Error("No secret were provided.");
  }

  const jwt = sign(claims, secret, options);
  return jwt;
};

export const verifyToken = async (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return await res.status(400).json({ message: "" });
  }

  const parsedCookie = parse(cookie);
  const { authToken } = parsedCookie;

  try {
    const decoded = verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    return next(req, res, decoded);
  } catch (error) {
    return await res.status(500).json({ message: "Server error." });
  }
};

export const verifyTokenServerSide = (ctx, next) => {
  const { cookie } = ctx.req.headers;

  if (!cookie) {
    return false;
  }

  const parsedCookie = parse(cookie);
  const { authToken } = parsedCookie;

  if (!authToken) {
    return false;
  }

  try {
    const decoded = verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
    
  } catch (error) {
    return false;
  }
};
