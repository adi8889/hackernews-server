"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getMe = void 0;
const prisma_1 = require("../../extras/prisma");
const users_types_1 = require("./users-types");
const getMe = async (parameters) => {
    const user = await prisma_1.prismaClient.user.findUnique({
        where: {
            id: parameters.userId,
        },
    });
    if (!user) {
        throw users_types_1.GetMeError.BAD_REQUEST;
    }
    return {
        user
    };
};
exports.getMe = getMe;
const getAllUsers = async () => {
    const users = await prisma_1.prismaClient.user.findMany();
    return {
        users,
    };
};
exports.getAllUsers = getAllUsers;
