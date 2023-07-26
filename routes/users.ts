import {Express, Request, Response, NextFunction, Router} from 'express';
import controllers from "../controllers/users";


const router:Router = Router();

router.get("/users",controllers.getUsers);
router.get("/user/:email",controllers.getUser);
router.put("/update/:email",controllers.updateUser);
router.post("/create",controllers.createUser);
router.delete("/delete/:email",controllers.deleteUser);

export default router