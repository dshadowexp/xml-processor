import XMLDoc from "../core/doc";
import XMLParser from "../core/parse";

/**
 * 
 * @param xmlString 
 * @returns 
 */
export function parseXMLString(xmlString: string): XMLDoc | null {
   try {
        const xmlParser = new XMLParser();
        xmlParser.parse(xmlString);
        return xmlParser.document();
    } catch (error) {
         return null;
    }
}