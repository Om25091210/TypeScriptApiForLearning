"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const books_1 = __importDefault(require("../controllers/books"));
const router = (0, express_1.Router)();
//routers for Users
router.get("/users", users_1.default.getUsers);
router.get("/user/:email", users_1.default.getUser);
router.put("/update/:email", users_1.default.updateUser);
router.post("/new_user", users_1.default.createUser);
router.delete("/delete_user/:email", users_1.default.deleteUser);
//router for Books
router.get("/books", books_1.default.getBooks);
router.get("/book/:name/:author?/:edition?", books_1.default.getBook);
router.post("/new_book", books_1.default.createBook);
router.put("/update_book", books_1.default.updateBook);
router.delete("/delete_book", books_1.default.deleteBook);
exports.default = router;
