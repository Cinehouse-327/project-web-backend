import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { errorMiddlewares } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";


/**
 * @constant
 * @type {express.Express}
 * @description This is the main Express application instance.
 */
export const app = express();


/**
 * @function
 * @description Loads environment variables from the config.env file.
 */
config({
  path: "./config.env",
});


/**
 * @function
 * @description Middleware to parse incoming JSON requests.
 */
app.use(express.json());


/**
 * @function
 * @description Middleware to enable CORS (Cross-Origin Resource Sharing).
 * This allows client requests from the origin defined in CLIENT_URL.
 */
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


/**
 * @function
 * @description Middleware to parse cookies attached to the incoming request.
 */
app.use(cookieParser());


/**
 * @function
 * @description Route handler for movie list related requests.
 * All routes under "/movielist" will be handled by movieListRoute.
 */
// app.use("/movielist", movieListRoute);


/**
 * @function
 * @description Route handler for authentication related requests.
 * All routes under "/auth" will be handled by authRoutes.
 */
app.use("/auth", authRoutes);


/**
 * @function
 * @description Route handler for user-related requests.
 * All routes under "/user" will be handled by userRoutes.
 */
// app.use("/user", userRoutes);


/**
 * @function
 * @description Global error handler for the application.
 * Handles errors thrown in routes or middlewares and sends appropriate responses.
 */
app.use(errorMiddlewares);
