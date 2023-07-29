import {Express, Request, Response, NextFunction, Router} from 'express';
import user_controllers from "../controllers/users";
import book_controllers from "../controllers/books";

const router:Router = Router();

//routers for Users
router.get("/users",user_controllers.getUsers);
router.get("/user/:email",user_controllers.getUser);
router.put("/update/:email",user_controllers.updateUser);
router.post("/new_user",user_controllers.createUser);
router.delete("/delete_user/:email",user_controllers.deleteUser);

//router for Books
router.get("/books",book_controllers.getBooks);
router.get("/book/:name/:author?/:edition?",book_controllers.getBook);
router.post("/new_book",book_controllers.createBook);
router.put("/update_book",book_controllers.updateBook);
router.delete("/delete_book",book_controllers.deleteBook);
export default router