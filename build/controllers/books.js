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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Getting all books list.
        let result = yield db_1.default.books_Inventory.findMany({});
        // Send the response with a 200 status code and the user data
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        // If there's an error, handle it by sending a 500 status code and an error message
        return res.status(500).json({
            error: "Failed to get books.",
        });
    }
});
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting a specific book.
        let name = req.params.name || "";
        let author = req.params.author || "";
        let edition = parseInt(req.params.edition) || 0;
        let result = yield db_1.default.books_Inventory.findFirst({
            where: {
                name: name,
                author: author,
                edition: edition,
            },
        });
        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            response: error,
        });
    }
});
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { author, quantity, description, edition, image, name } = req.body;
        //create record.
        let key = author + "`" + name + "`" + edition;
        let result = yield db_1.default.books_Inventory.create({
            data: {
                author: author,
                quantity: quantity,
                description: description,
                edition: edition,
                image: image,
                name: name,
                key: key,
            },
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            response: error,
        });
    }
});
//** Requires edition, name and author to update. */
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, quantity, description, edition, image, name } = req.body;
        const key = `${author}\`${name}\`${edition}`;
        // Create a data object with only the fields that are present in the request body
        const dataToUpdate = {};
        if (author !== undefined) {
            dataToUpdate.author = author;
        }
        if (quantity !== undefined) {
            dataToUpdate.quantity = quantity;
        }
        if (description !== undefined) {
            dataToUpdate.description = description;
        }
        if (edition !== undefined) {
            dataToUpdate.edition = edition;
        }
        if (image !== undefined) {
            dataToUpdate.image = image;
        }
        if (name !== undefined) {
            dataToUpdate.name = name;
        }
        // Perform the update operation with the data object
        const result = yield db_1.default.books_Inventory.update({
            where: {
                key: key,
            },
            data: dataToUpdate,
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            response: error,
        });
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Get the record and delete.
        const { author, edition, name } = req.body;
        const key = `${author}\`${name}\`${edition}`;
        let result = yield db_1.default.books_Inventory.delete({
            where: {
                key: key
            }
        });
        return res.status(200).json({
            response: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            response: error,
        });
    }
});
exports.default = { getBooks, getBook, createBook, updateBook, deleteBook };
