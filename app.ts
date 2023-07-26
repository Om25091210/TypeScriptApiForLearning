import express, { Express, Request, Response, NextFunction } from "express";
import morgan from 'morgan';
import route_users from "./routes/users"
import authmiddleware from "./controllers/authMiddleware"

const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({extended:true}));

router.use(express.json());

router.use(authmiddleware);

router.use('/',route_users);

const PORT: any = process.env.PORT ?? 6060;
router.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})