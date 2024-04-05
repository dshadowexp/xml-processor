import { extname, basename } from "node:path";
import { createReadStream } from "node:fs";
import { allowedExtensions } from "../types";
import XMLDocument from "../core/document";
import XMLParser from "../core/parse";

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

/**
 * 
 * @param filePath 
 */
export async function parseXMLFile(filePath: string): Promise<XMLDocument | null> {
    try {
        // Validate the allowed extensions of the file
        if (!isValidFileExtenion(filePath, allowedExtensions)) {
            throw new Error('Select a file with a valid extension')
        }

        const xmlParser = new XMLParser();
        const fileReadStream = createReadStream(filePath);
        const parsePromise = new Promise<XMLDocument>((resolve, reject) => {
            fileReadStream.on("data", (chunk) => {
                xmlParser.parse(chunk);
            })
    
            fileReadStream.on('end', () => {
                resolve(xmlParser.document());
            })
    
            fileReadStream.on('error', (error) => {
                reject(error);
            })
        });

        return await parsePromise;
    } catch (error) {
        return null;
    }
}