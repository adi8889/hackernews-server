"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.createComment = exports.getCommentsOnPost = void 0;
const prisma_1 = require("../../extras/prisma");
const getCommentsOnPost = async (parameters) => {
    const limit = 10;
    const offset = (parameters.page - 1) * limit;
    const comments = await prisma_1.prismaClient.comment.findMany({
        where: {
            postId: parameters.postId,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
    });
    return { comments };
};
exports.getCommentsOnPost = getCommentsOnPost;
const createComment = async (parameters) => {
    const comment = await prisma_1.prismaClient.comment.create({
        data: {
            userId: parameters.userId,
            postId: parameters.postId,
            content: parameters.content,
        },
    });
    return { comment };
};
exports.createComment = createComment;
const deleteComment = async (parameters) => {
    const comment = await prisma_1.prismaClient.comment.delete({
        where: {
            id: parameters.commentId,
            userId: parameters.userId,
        },
    });
};
exports.deleteComment = deleteComment;
const updateComment = async (parameters) => {
    const comment = await prisma_1.prismaClient.comment.update({
        where: {
            id: parameters.commentId,
            userId: parameters.userId,
        },
        data: {
            content: parameters.content,
        },
    });
    return { comment };
};
exports.updateComment = updateComment;
