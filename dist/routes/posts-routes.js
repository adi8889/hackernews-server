"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const hono_1 = require("hono");
const token_middlewarre_1 = require("./middlewares/token-middlewarre");
const posts_controller_1 = require("../controllers/posts/posts-controller");
exports.postsRoutes = new hono_1.Hono();
exports.postsRoutes.get("", token_middlewarre_1.tokenMiddleware, async (context) => {
    try {
        const page = Number(context.req.query("page")) || 1;
        const posts = await (0, posts_controller_1.getAllPosts)({ page });
        return context.json({ data: posts });
    }
    catch (e) {
        return context.json({
            error: "Failed to fetch posts",
        }, 500);
    }
});
exports.postsRoutes.get("/me", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    try {
        const userPosts = await (0, posts_controller_1.getMePosts)({ userId });
        return context.json({
            data: userPosts,
        });
    }
    catch (e) {
        return context.json({
            error: "Failed to fetch user's posts",
        }, 500);
    }
});
exports.postsRoutes.post("", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const { title, description, content } = await context.req.json();
    try {
        const newPost = await (0, posts_controller_1.createPost)({ userId, title, description, content });
        return context.json({
            data: newPost,
        }, 201);
    }
    catch (e) {
        return context.json({
            error: "Failed to create post",
        });
    }
});
exports.postsRoutes.delete("/:postId", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    const postId = context.req.param("postId");
    try {
        await (0, posts_controller_1.deletePost)({ userId, postId });
        return context.json({ message: "deleted the post successfully" });
    }
    catch (e) {
        return context.json({
            error: "failed to delete post",
        });
    }
});
