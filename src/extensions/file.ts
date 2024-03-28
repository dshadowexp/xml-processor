import { extname, basename } from "node:path";
import { createReadStream } from "node:fs";
import { allowedExtensions } from "../types";
import XMLDocument from "../core/document";
import XMLParser from "../core/parse";

//======= Validate a File base on the extensions ============//
//===========================================================//
/**
 * 
 * @param filePath 
 * @param extensionList 
 * @returns 
 */
function isValidFileExtenion(filePath: string, extensionList: string[]) {
    const fileExtension = extname(basename(filePath));
    return extensionList.includes(fileExtension);
}

//======= Validate a File base on the extensions ============//
//===========================================================//
/**
 * 
 * @param filePath 
 */
export async function file_xml(filePath: string): Promise<XMLDocument | null> {
    try {
        // Validate the allowed extensions of the file
        if (!isValidFileExtenion(filePath, allowedExtensions)) {
            throw new Error('Select a file with a valid extension')
        }

        const xmlParser = new XMLParser();
        const fileReadStream = createReadStream(filePath);

        const parsePromise = new Promise<XMLDocument>((resolve, reject) => {
            fileReadStream.on('data', (chunk) => {
                xmlParser.parse(chunk);
            });
    
            fileReadStream.on('finish', () => {
                resolve(xmlParser.document());
            });
    
            fileReadStream.on('error', (error) => {
                reject(error);
            });
        });

        return await parsePromise;
    } catch (error) {
        return null;
    }
}