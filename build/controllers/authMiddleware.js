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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const AUTH_KEY = (_a = process.env.ROUTE_AUTH_STRING) !== null && _a !== void 0 ? _a : "";
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authKey = req.headers.authorization;
    if (!authKey || authKey !== AUTH_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});
exports.default = authMiddleWare;
