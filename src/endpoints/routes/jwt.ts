import express from "express";
import TokenUtils from "../../auth/TokenUtils";

export default function load(app: express.Application) {
  app.get("/auth/create", async (req, res) => {
    const token = await TokenUtils.createToken();
    res.send({ token: token, timestamp: new Date().getTime() });
  });

  app.get("/auth/check", async (req, res) => {
    const token = req.headers.token || req.headers.authorization;
    if (!token) {
      res.send({
        hasError: true,
        error: "No token provided",
        timestamp: new Date().getTime(),
      });
      return;
    }

    const tokenData = await TokenUtils.runTokenVerify(token, res);

    if (!tokenData) return;

    res.send({
      hasError: false,
      data: tokenData,
      timestamp: new Date().getTime(),
    });
  });
}
