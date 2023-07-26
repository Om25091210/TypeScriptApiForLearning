"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all users from the database
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.users.findMany({});
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Failed to get users.",
        });
    }
});
// Get a specific user from the database based on the provided email
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield prisma.users.findFirst({
            where: {
                email: email,
            },
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Failed to get user.",
        });
    }
});
// Update a user's information in the database
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const { name, password, phoneNo } = req.body;
        const result = yield prisma.users.update({
            where: {
                email: email,
            },
            data: {
                name: name,
                password: password,
                phoneNo: phoneNo,
                updatedAt: new Date().toISOString(),
            },
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Failed to update user.",
        });
    }
});
// Create a new user in the database
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, phoneNo } = req.body;
        const result = yield prisma.users.create({
            data: {
                email: email,
                name: name,
                password: password,
                phoneNo: phoneNo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });
        return res.status(201).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Failed to create user.",
        });
    }
});
// Delete a user from the database
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield prisma.users.delete({
            where: {
                email: email,
            },
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Failed to delete user.",
        });
    }
});
exports.default = { getUsers, getUser, updateUser, deleteUser, createUser };
