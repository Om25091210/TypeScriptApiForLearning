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
const AUTH_KEY = "LqA[3br%H{Am1r2aFmXx_=Z1r1";
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authKey = req.headers.authorization;
    if (!authKey || authKey !== AUTH_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});
exports.default = authMiddleWare;
