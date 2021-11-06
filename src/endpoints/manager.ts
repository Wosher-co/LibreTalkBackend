import express from "express";
import fs from "fs";
import path from "path";

export class EndpointManager {
  private _app: express.Application;

  constructor() {
    this._app = express();

    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));

    // TODO: Load all endpoints
    this.loadEndpoints(path.join(__dirname, "routes"));

    const port = process.env.PORT || 3000;
    this._app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }

  private loadEndpoints(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach(async (file) => {
      if (
        file.endsWith(".d.ts") ||
        !(file.endsWith(".ts") || file.endsWith(".js"))
      )
        return;

      try {
        (await import(path.join(dir, file))).default(this._app);

        console.log(`Loaded endpoint "${file}"`);
      } catch (e) {
        console.log("=================================");
        console.log(`\nFile "${file} is not a valid endpoint\n`);
        console.error(e);
        console.log("\n=================================\n");
      }
    });
  }
}
