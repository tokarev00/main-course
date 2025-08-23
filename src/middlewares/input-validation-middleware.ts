import type {Response, Request, NextFunction} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(400).json({errors: errors.array()});
    }
    next();
}