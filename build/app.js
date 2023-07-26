"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const users_1 = __importDefault(require("./routes/users"));
const authMiddleware_1 = __importDefault(require("./controllers/authMiddleware"));
const router = (0, express_1.default)();
router.use((0, morgan_1.default)('dev'));
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
router.use(authMiddleware_1.default);
router.use('/', users_1.default);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6060;
router.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
