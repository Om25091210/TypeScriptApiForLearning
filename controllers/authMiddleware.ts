import { Request, Response, NextFunction } from 'express';

const AUTH_KEY:string ="LqA[3br%H{Am1r2aFmXx_=Z1r1";

const authMiddleWare = async (req:Request, res:Response,next:NextFunction) =>{
    const authKey = req.headers.authorization;

    if (!authKey || authKey !== AUTH_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();

};


export default authMiddleWare;