import XMLDocument from "../core/document";
import XMLParser from "../core/parse";

/**
 * 
 * @param xmlString 
 * @returns 
 */
export function string_xml(xmlString: string): XMLDocument | null {
    try {
        const xmlParser = new XMLParser();
        xmlParser.parse(xmlString);
        return xmlParser.document();
    } catch (error) {
        return null;
    }
}