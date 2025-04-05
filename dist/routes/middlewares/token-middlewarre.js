"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const factory_1 = require("hono/factory");
const jwt = require("jsonwebtoken");
const environment_1 = require("../../environment");
exports.tokenMiddleware = (0, factory_1.createMiddleware)(async (context, next) => {
    const token = context.req.header("token");
    if (!token) {
        return context.json({
            message: "missing Token",
        }, 401);
    }
    try {
        const payload = jwt.verify(token, environment_1.jwtsecretKey);
        const userId = payload.sub;
        if (userId) {
            context.set("userId", userId);
        }
        await next();
    }
    catch (e) {
        return context.json({ message: "Unauthorized token" }, 401);
    }
});
