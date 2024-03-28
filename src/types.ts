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
export type StringFormat = |
    'flat' | 
    'canonical' | 
    'hierarchy' | 
    'straight' | 
    'normal' | 
    '';

/**
 * 
 */
export const allowedExtensions: string[] = [ 
    '.xml', '.xsd', '.xslt', '.xsl', '.dtd', '.svg', '.plist', '.dtd' 
];