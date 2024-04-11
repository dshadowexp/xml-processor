import { Request, Response, NextFunction, Handler } from "express";
import XMLParser from "../core/parse";

/**
 * 
 * @returns Handler
 */
export function parseXMLExpress(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.headers['content-type'] !== 'application/xml') {
                next();
                return;
            }
    
            const xmlParser = new XMLParser();

            req.on("data", (chunk) => {
                xmlParser.parse(chunk);
            });
    
            req.on('end', () => {
                req.body = xmlParser.getDocument();
                next();
            });
    
            req.on('error', (error) => {
                next(error);
            });

        } catch (error) {
            next(error);
        }
    }
}