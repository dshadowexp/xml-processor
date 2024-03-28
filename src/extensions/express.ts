import { Request, Response, NextFunction } from "express";
import XMLParser from "../core/parse";

//======= Validate a File base on the extensions ============//
//===========================================================//
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function express_xml(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.headers['content-type'] !== 'application/xml') {
            next();
            return;
        }

        const xmlParser = new XMLParser();
        req.on("data", (chunk) => {
            xmlParser.parse(chunk);
        });

        req.on("finish", () => {
            req.body = xmlParser.document();
            next();
        });

        req.on("error", (error) => {
            next(error);
        })
    } catch (error) {
        next(error);
    }
}