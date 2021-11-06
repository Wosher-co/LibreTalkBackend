import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const secret = "secret";

type Token = {
  id: string;
  revision: number;
};

async function createToken(): Promise<string> {
  const token = await jwt.sign({ id: uuidv4(), revision: 0 }, secret, {
    expiresIn: "1h",
  });

  return token;
}

async function verifyToken(
  token: string | string[]
): Promise<Token | undefined> {
  try {
    let decToken = Array.isArray(token) ? token[0] : token;
    const decoded = (await jwt.verify(decToken, secret)) as Token;
    return decoded;
  } catch (e) {
    return undefined;
  }
}

async function runTokenVerify(
  token: string | string[],
  res: express.Response
): Promise<Token | undefined> {
  const decoded = await verifyToken(token);

  if (!decoded) {
    res
      .status(401)
      .send({
        error: "Invalid token",
        hasError: true,
        timestamp: new Date().getTime(),
      });
    return undefined;
  }

  return decoded;
}

export default {
  createToken,
  verifyToken,
  runTokenVerify,
};
