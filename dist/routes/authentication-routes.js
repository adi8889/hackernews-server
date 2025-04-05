"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRoutes = void 0;
const hono_1 = require("hono");
const authentication_controller_1 = require("../controllers/authentication/authentication-controller");
const authentication_types_1 = require("../controllers/authentication/authentication-types");
exports.authenticationRoutes = new hono_1.Hono();
exports.authenticationRoutes.post("/sign-up", async (context) => {
    const { username, password } = await context.req.json();
    try {
        const result = await (0, authentication_controller_1.signUpWithUsernameAndPassword)({
            username,
            password,
        });
        return context.json({
            data: result,
        }, 201);
    }
    catch (e) {
        if (e === authentication_types_1.SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
            return context.json({
                message: "Username already exists",
            }, 409);
        }
        return context.json({
            mesage: "Unknown",
        }, 500);
    }
});
exports.authenticationRoutes.post("/log-in", async (context) => {
    try {
        const { username, password } = await context.req.json();
        const result = await (0, authentication_controller_1.logInWithUsernameAndPassword)({
            username,
            password,
        });
        return context.json({
            data: result,
        }, 201);
    }
    catch (e) {
        console.log("Error", e);
        if (e === authentication_types_1.LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD) {
            return context.json({
                message: "Incorrect username or password",
            }, 401);
        }
        return context.json({
            message: "Unknown",
        }, 500);
    }
});
