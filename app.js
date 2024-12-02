import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { errorMiddlewares } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/sazzad/bookingRoute.js"
import searchRoutes from "./routes/sazzad/searchRoute.js"

import giftCardRoutes from "./routes/akif/giftCardRoute.js"
import profileRoutes from "./routes/akif/profileRoute.js"

import paymentRoutes from "./routes/aman/paymentRoute.js"
import reviewRoutes from "./routes/aman/reviewRoutes.js"

import helperRoutes from "./routes/amit/helperRouter.js"
import movieListRoutes from "./routes/amit/movielistRoute.js"

import foodRoutes from "./routes/zaed/foodRoutes.js"
import watchListRoutes from "./routes/zaed/watchlistRoutes.js"

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
app.use("/user", bookingRoutes);

/**
 * @function
 * @description Route handler for movie-related search requests.
 * All routes under "/search" will be handled by movieRoute.
 */
app.use("/search", searchRoutes);


/**
 * @function
 * @description Route handler for review-related requests.
 * All routes under "/review" will be handled by reviewRoutes.
 * This includes creating reviews, fetching reviews, and other review-related actions.
 */
app.use("/review", reviewRoutes);


/**
 * @function
 * @description Route handler for payment-related requests.
 * All routes under "/payment" will be handled by paymentRoute.
 */
app.use("/payment", paymentRoutes);


/**
 * @function
 * @description Route handler for food-related requests.
 * All routes under "/api" will be handled by foodRoutes.
 * This includes listing food items, searching for food, and food ordering-related actions.
 */
app.use("/api", foodRoutes);


/**
 * @function
 * @description Route handler for watchlist-related requests.
 * All routes under "/watchlist" will be handled by watchListRoutes.
 * This includes adding, removing, or viewing items on a watchlist.
 */
app.use("/watchlist", watchListRoutes);


/**
 * @function
 * @description Route handler for help-related requests.
 * All routes under "/help" will be handled by helperRoutes.
 * This includes handling customer support, FAQs, and other assistance-related actions.
 */
app.use("/help", helperRoutes);


/**
 * @function
 * @description Route handler for movie list-related requests.
 * All routes under "/movielist" will be handled by movieListRoutes.
 * This includes fetching, filtering, and displaying lists of movies.
 */
app.use("/movielist", movieListRoutes);


/**
 * @function
 * @description Route handler for gift card-related requests.
 * All routes under "/gift" will be handled by giftCardRoutes.
 * This includes purchasing, redeeming, and checking the balance of gift cards.
 */
app.use("/gift", giftCardRoutes);


/**
 * @function
 * @description Route handler for profile-related requests.
 * All routes under "/profile" will be handled by profileRoutes.
 * This includes viewing and updating user profiles and profile-related actions.
 */
app.use("/profile", profileRoutes);



/**
 * @function
 * @description Global error handler for the application.
 * Handles errors thrown in routes or middlewares and sends appropriate responses.
 */
app.use(errorMiddlewares);
