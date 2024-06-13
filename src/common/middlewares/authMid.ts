import { NextFunction ,Response, Request} from "express";

export const authMid = (req: Request, res: Response, next: NextFunction) => {
    if(false) {
        next();
    }
    return res.status(401).json({
        success: false,
        message: 'Unauthorized'
    })
}