"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesRoutes = void 0;
const hono_1 = require("hono");
const token_middlewarre_1 = require("./middlewares/token-middlewarre");
const likes_controller_1 = require("../controllers/likes/likes-controller");
exports.likesRoutes = new hono_1.Hono();
exports.likesRoutes.get("/on/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const postId = context.req.param("postId");
    const page = Number(context.req.query("page")) || 1;
    try {
        const likes = await (0, likes_controller_1.getLikesOnPost)({ postId, page });
        return context.json({
            data: likes,
        }, 200);
    }
    catch (e) {
        context.json({
            error: "failed to fetch likes",
        }, 500);
    }
});
exports.likesRoutes.post("/on/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const postId = context.req.param("postId");
    try {
        const like = await (0, likes_controller_1.createLike)({ userId, postId });
        return context.json({
            data: like,
        }, 201);
    }
    catch (e) {
        context.json({
            error: "failed to like post",
        }, 500);
    }
});
exports.likesRoutes.delete("/on/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const postId = context.req.param("postId");
    try {
        await (0, likes_controller_1.deleteLike)({ userId, postId });
        return context.json({ message: "Like removed" });
    }
    catch (e) {
        context.json({ error: "failed to unlike post" }, 500);
    }
});
