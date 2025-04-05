"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoutes = void 0;
const hono_1 = require("hono");
const token_middlewarre_1 = require("./middlewares/token-middlewarre");
const comments_controller_1 = require("../controllers/comments/comments-controller");
exports.commentsRoutes = new hono_1.Hono();
exports.commentsRoutes.get("/on/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const postId = context.req.param("postId");
    const page = Number(context.req.query("page")) || 1;
    try {
        const comments = await (0, comments_controller_1.getCommentsOnPost)({ postId, page });
        return context.json({ data: comments });
    }
    catch (e) {
        return context.json({ error: "Failed to fetch comments" }, 500);
    }
});
exports.commentsRoutes.post("/on/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const postId = context.req.param("postId");
    const { content } = await context.req.json();
    try {
        const comment = await (0, comments_controller_1.createComment)({ userId, postId, content });
        return context.json({
            data: comment,
        });
    }
    catch (e) {
        return context.json({
            error: "Failed to create comment",
        });
    }
});
exports.commentsRoutes.delete("/:commentId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const commentId = context.req.param("commentId");
    try {
        await (0, comments_controller_1.deleteComment)({ userId, commentId });
    }
    catch (e) {
        return context.json({
            error: "Failed to delete comment",
        }, 500);
    }
});
exports.commentsRoutes.patch("/:commentId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const commentId = context.req.param("commentId");
    const { content } = await context.req.json();
    try {
        const comment = await (0, comments_controller_1.updateComment)({ userId, commentId, content });
        return context.json({ data: comment });
    }
    catch (e) {
        return context.json({
            error: "Failed to update comment",
        }, 500);
    }
});
