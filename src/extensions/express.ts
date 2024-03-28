import { Request, Response, NextFunction, Handler } from "express";
import XMLParser from "../core/parse";

/**
 * 
 * @returns Handler
 */
export function xmlContentParser(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.headers['content-type'] !== 'application/xml') {
                next();
                return;
            }
    
            const xmlParser = new XMLParser();
            
            xmlParser.on('done', (document) => {
                req.body = document;
                next();
            });

            xmlParser.on('error', (error) => {
                next(error);
            });

            xmlParser.streamParse(req);
        } catch (error) {
            next(error);
        }
    }
}