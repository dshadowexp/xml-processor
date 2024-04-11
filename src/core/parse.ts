import XMLDoc from "./doc";
import XMLElement from "./element";
import { ElementType } from "../types";

export default class XMLParser {
    private _level: number;
    private _document: XMLDoc;
    private _current: XMLElement;
    private _xml_chars: string[];
    private _stack: XMLElement[];

    constructor() {
        this._level = -1;
        this._document = new XMLDoc();
        this._current = this._document.rootNode;
        this._xml_chars = [];
        this._stack = [];
        this._stack.push(this._current);
    }

    public getDocument(): XMLDoc {
        return this._document;
    }

    public processElement(elementString: string, parent: XMLElement | null, type: ElementType): XMLElement {
        const tagContents = elementString.split(' ');
        let elementName: string = '';
        switch (type) {
            case 'empty': {
                elementName = tagContents[0].substring(0, elementString.length - 1);
                break;
            } case 'instruction': {
                elementName = tagContents[0].substring(1, elementString.length);
                break;
            } case 'open': {
                elementName = tagContents[0];
                break;
            } case 'root': {
                elementName = elementString;
                break;
            } default: {
                elementName = '';
                break;
            }
        }

        const newNode = new XMLElement(elementName, type);
        if (parent) parent.addChild(newNode);

        const properties = tagContents.slice(1);
        for (let i = 0; i < properties.length; i++) {
            if (properties[i]) {
                const attr = properties[i].split('=');
                newNode.addAttr(attr[0], attr[1].substring(1, attr[1].length - 1));
            }
        }

        return newNode;
    }

    public parse(xml: string | Buffer): void {
        xml = xml.toString('utf-8');
        for (let i = 0; i < xml.length; i++) {
            // Read the current character into memory
            const ch = xml[i];

            // Handle the process when character is "<" 
            if (ch === "<") {
                // Add content if node existing
                if (this._xml_chars.length > 0) {
                    const innerValue = this._xml_chars.join('').replace(/\s+/g, ' ').trim();
                    if (innerValue) this._current.content = innerValue;
                }

                this._level++;
                this._xml_chars = [];
            } else if (ch === ">") {
                // Read tag content
                const parentNode = this._stack[this._stack.length - 1];
                const tagString = this._xml_chars.join('').replace(/\s+/g, ' ').trim();
 
                // If it starts with '/' => closing tag
                if (tagString[0] === '/') { 
                    if (!this._stack) {
                        throw new Error('Stack is empty');
                    }
                    
                    const poppedNode = this._stack.pop()!;
                    if (poppedNode.name !== tagString.substring(1, tagString.length)) {
                        throw new Error(`Unmatching open tags: ${poppedNode.name}`);
                    }

                    this._current = poppedNode;
                    this._level -= 2;
                } 
                // If it ends with '/' => empty tag
                else if (tagString[tagString.length - 1] === '/') {
                    this._current = this.processElement(tagString.substring(0, tagString.length - 1), parentNode, 'empty');
                    this._document.addNode(this._current);
                    this._level--;
                }
                // If it start with '?' => 'instructional'
                else if (tagString[0] === '?') {
                    this._current = this.processElement(tagString.substring(1), parentNode, 'instruction');
                    this._document.addNode(this._current);
                    this._level--;
                }
                // If it has none => opening tag
                else {
                    this._current = this.processElement(tagString, parentNode, 'open');
                    this._document.addNode(this._current);
                    this._stack.push(this._current);
                }
                
                this._xml_chars = [];
            } else {
                this._xml_chars.push(ch);
            }
        }
    }
}