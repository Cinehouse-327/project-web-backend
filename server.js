import { config } from "dotenv";
config({ path: "./data/config.env" });

import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

/**
 * Starts the server on the specified port.
 * @param {string} process.env.PORT - The port number from the environment variable.
 */
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port ${process.env.PORT}`
  );
});
