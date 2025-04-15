import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes.js";
import { usersRoutes } from "./user-routes.js";
import { postsRoutes } from "./posts-routes.js";
import { likesRoutes } from "./likes-routes.js";
import { commentsRoutes } from "./comments-routes.js";
import { logger } from "hono/logger";
import { swaggerRoutes } from "./swagger-routes";


export const allRoutes = new Hono();

allRoutes.use(logger());

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);
allRoutes.route("/ui", swaggerRoutes);

allRoutes.get("/health", (context) => {
  return context.json({ message: "All Ok" }, 200);
});