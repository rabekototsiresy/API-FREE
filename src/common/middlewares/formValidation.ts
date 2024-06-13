import {Schema, ValidationResult} from 'joi';
import {Response, Request, NextFunction} from 'express';
import {IResponse} from "../interfaces/IResponse";

export const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid: ValidationResult = schema.validate(req.body);
        if (!valid.error) {
            req.body.value = valid.value;
            return next();
        }
        const {details} = valid.error;
        const message = details.map((i: any) => i.message).join(',');
        return res.status(422).json({message, success: false, status: 422} as IResponse);
    }
};