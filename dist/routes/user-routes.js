"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const hono_1 = require("hono");
const token_middlewarre_1 = require("./middlewares/token-middlewarre");
const users_controller_1 = require("../controllers/users/users-controller");
const users_types_1 = require("../controllers/users/users-types");
exports.usersRoutes = new hono_1.Hono();
exports.usersRoutes.get("/me", token_middlewarre_1.tokenMiddleware, async (context) => {
    const userId = context.get("userId");
    try {
        const user = await (0, users_controller_1.getMe)({
            userId,
        });
        return context.json({
            data: user,
        }, 200);
    }
    catch (e) {
        if (e === users_types_1.GetMeError.BAD_REQUEST) {
            return context.json({
                error: "User not found",
            }, 400);
        }
        return context.json({
            message: "Internal Server Error",
        }, 500);
    }
});
exports.usersRoutes.get("", token_middlewarre_1.tokenMiddleware, async (context) => {
    try {
        const users = await (0, users_controller_1.getAllUsers)();
        return context.json({
            data: users,
        }, 200);
    }
    catch (e) {
        return context.json({
            message: "Internal Server Error",
        }, 500);
    }
});
