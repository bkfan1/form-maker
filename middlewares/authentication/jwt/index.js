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
