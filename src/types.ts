/**
 * 
 */
export type ElementType = | 
    'root' | 
    'open' | 
    'empty' | 
    'instruction' | 
    'comment';

/**
 * 
 */
export const allowedExtensions: string[] = [ 
    '.xml', '.xsd', '.xslt', '.xsl', '.dtd', '.svg', '.plist', '.dtd' 
];