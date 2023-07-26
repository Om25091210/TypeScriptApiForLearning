"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const router = (0, express_1.Router)();
router.get("/users", users_1.default.getUsers);
router.get("/user/:email", users_1.default.getUser);
router.put("/update/:email", users_1.default.updateUser);
router.post("/create", users_1.default.createUser);
router.delete("/delete/:email", users_1.default.deleteUser);
exports.default = router;
