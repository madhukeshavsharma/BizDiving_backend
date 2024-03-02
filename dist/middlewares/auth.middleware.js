"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../config/index");
const HttpException_1 = require("../handlers/HttpException");
// import {User} from '@interfaces/users.interface';
// import {Users} from '@models/users.model';
const authMiddleware = async (req, res, next) => {
    try {
        const Authorization = req.header('Authorization')
            ? req.header('Authorization').split('Bearer ')[1]
            : null;
        if (Authorization) {
            const secretKey = index_1.SECRET_KEY;
            const verificationResponse = (await (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            const userId = verificationResponse.id;
            // const findUser: any = await Users.query().findById(userId);
            const findUser = {};
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 101, 'Wrong authentication token', {}));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, 101, 'Authentication token missing', {}));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 101, 'Wrong authentication token', {}));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map