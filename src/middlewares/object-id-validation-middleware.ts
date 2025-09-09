import { param } from 'express-validator';
import type {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';

export const validateMongoIdMiddleware = [
    param('id')
        .custom((value) => {
            return /^[a-f\d]{24}$/i.test(value);
        })
        .withMessage('Invalid MongoDB ObjectId'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
