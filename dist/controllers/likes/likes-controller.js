"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.createLike = exports.getLikesOnPost = void 0;
const prisma_1 = require("../../extras/prisma");
const getLikesOnPost = async (parameters) => {
    const limit = 10;
    const offset = (parameters.page - 1) * limit;
    const likes = await prisma_1.prismaClient.like.findMany({
        where: {
            postId: parameters.postId,
        },
        orderBy: { createAt: "desc" },
        skip: offset,
        take: limit,
    });
    return { likes };
};
exports.getLikesOnPost = getLikesOnPost;
const createLike = async (parameters) => {
    const existingLike = await prisma_1.prismaClient.like.findFirst({
        where: {
            userId: parameters.userId,
            postId: parameters.postId,
        },
    });
    if (existingLike) {
        throw new Error("Already liked");
    }
    const like = await prisma_1.prismaClient.like.create({
        data: {
            userId: parameters.userId,
            postId: parameters.postId,
        },
    });
    return { like };
};
exports.createLike = createLike;
const deleteLike = async (parameters) => {
    try {
        await prisma_1.prismaClient.like.deleteMany({
            where: {
                userId: parameters.userId,
                postId: parameters.postId,
            },
        });
    }
    catch (error) {
        throw new Error("Failed to delete like");
    }
};
exports.deleteLike = deleteLike;
