"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInWithUsernameAndPassword = exports.signUpWithUsernameAndPassword = void 0;
const crypto_1 = require("crypto");
const authentication_types_1 = require("./authentication-types");
const prisma_1 = require("../../extras/prisma");
const jwt = require("jsonwebtoken");
const environment_1 = require("../../environment");
const signUpWithUsernameAndPassword = async (parameters) => {
    const isUserExistingAlready = await checkIfUserExistsAlready({
        username: parameters.username,
    });
    if (isUserExistingAlready) {
        throw authentication_types_1.SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
    }
    const passwordHash = createPasswordHash({
        password: parameters.password,
    });
    const user = await prisma_1.prismaClient.user.create({
        data: {
            username: parameters.username,
            password: passwordHash,
        },
    });
    const token = createJWToken({
        id: user.id,
        username: user.username,
    });
    const result = {
        token,
        user,
    };
    return result;
};
exports.signUpWithUsernameAndPassword = signUpWithUsernameAndPassword;
const logInWithUsernameAndPassword = async (parameters) => {
    // 1. Create the password hash
    const passwordHash = createPasswordHash({
        password: parameters.password,
    });
    // 2. Find the user with the username and password hash
    const user = await prisma_1.prismaClient.user.findUnique({
        where: {
            username: parameters.username,
            password: passwordHash,
        },
    });
    // 3. If the user is not found, throw an error
    if (!user) {
        throw authentication_types_1.LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD;
    }
    // 4. If the user is found, create a JWT token and return it
    const token = createJWToken({
        id: user.id,
        username: user.username,
    });
    return {
        token,
        user,
    };
};
exports.logInWithUsernameAndPassword = logInWithUsernameAndPassword;
const createJWToken = (parameters) => {
    // Generate token
    const jwtPayload = {
        iss: "https://purpleshorts.co.in",
        sub: parameters.id,
        username: parameters.username,
    };
    const token = jwt.sign(jwtPayload, environment_1.jwtsecretKey, {
        expiresIn: "30d",
    });
    return token;
};
const checkIfUserExistsAlready = async (parameters) => {
    const existingUser = await prisma_1.prismaClient.user.findUnique({
        where: {
            username: parameters.username,
        },
    });
    if (existingUser) {
        return true;
    }
    return false;
};
const createPasswordHash = (parameters) => {
    return (0, crypto_1.createHash)("sha256").update(parameters.password).digest("hex");
};
