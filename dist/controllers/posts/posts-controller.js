"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getAllPosts = exports.getMePosts = void 0;
const prisma_1 = require("../../extras/prisma");
const posts_types_1 = require("./posts-types");
const getMePosts = async (parameters) => {
    const rawPosts = await prisma_1.prismaClient.post.findMany({
        where: {
            userId: parameters.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const posts = rawPosts.map(post => ({
        ...post,
        updatedAt: post.updatedAT, // Correctly map updatedAT to updatedAt
    })).map(({ updatedAT, ...rest }) => rest); // Remove the incorrect property
    return {
        posts,
    };
};
exports.getMePosts = getMePosts;
const getAllPosts = async (parameters) => {
    const limit = 10;
    const offset = (parameters.page - 1) * limit;
    const rawPosts = await prisma_1.prismaClient.post.findMany({
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
    });
    const posts = rawPosts.map(post => ({
        ...post,
        updatedAt: post.updatedAT, // Map updatedAT to updatedAt
    })).map(({ updatedAT, ...rest }) => rest); // Remove the incorrect property
    return { posts };
};
exports.getAllPosts = getAllPosts;
const createPost = async (parameters) => {
    try {
        const newPost = await prisma_1.prismaClient.post.create({
            data: {
                userId: parameters.userId,
                title: parameters.title,
                description: parameters.description,
                content: parameters.content,
                updatedAT: new Date(), // Ensure updatedAT is explicitly set
            },
        });
        return { newPost: { ...newPost, updatedAt: newPost.updatedAT } };
    }
    catch (e) {
        throw posts_types_1.createPostError.UNKNOWN;
    }
};
exports.createPost = createPost;
const deletePost = async (parameters) => {
    const post = await prisma_1.prismaClient.post.findUnique({
        where: {
            id: parameters.postId,
        },
    });
    if (!post || post.userId != parameters.userId) {
        throw new Error("Unauthorized to delete this post");
    }
    await prisma_1.prismaClient.post.delete({
        where: {
            id: parameters.postId,
        },
    });
};
exports.deletePost = deletePost;
