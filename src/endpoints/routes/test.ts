import express from "express"

export default function routes(app: express.Application) {
  app.get("/test", (req, res) => {
    res.send("Hello World!")
  })
};