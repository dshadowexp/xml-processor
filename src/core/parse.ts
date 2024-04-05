import EventEmitter from "events";
import { Readable } from "stream";
import XMLDoc from "./doc";
import XMLElement from "./element";

export default class XMLParser extends EventEmitter {
    private _level: number;
    private _root: XMLElement;
    private _current: XMLElement;
    private _xml_chars: string[];
    private _stack: XMLElement[];

    constructor() {
        super();
        this._level = -1;
        this._root = this._createNode(null);
        this._current = this._root;
        this._xml_chars = [];
        this._stack = [];
        this._stack.push(this._current);
    }

    private _createNode(parent: XMLElement | null) {
        const newNode = new XMLElement('', parent);
        if (parent) parent.addChild(newNode);
        return newNode;
    }

    private _processTagContent(node: XMLElement, content: String) {
        const properties = content.split(' ');
        node.name = properties[0];
        for (let i = 1; i < properties.length; i++) {
            if (properties[i]) {
                const attr = properties[i].split('=');
                node.addAttr(attr[0], attr[1].substring(1, attr[1].length - 1));
            }
        }
    } 

    public document(): XMLDoc {
        return new XMLDoc(this._root);
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
                const tagContent = this._xml_chars.join('').replace(/\s+/g, ' ').trim();
 
                // If it starts with '/' => closig tag
                if (tagContent[0] === '/') { 
                    if (!this._stack) {
                        throw new Error('Stack is empty');
                    }
                    
                    const poppedNode = this._stack.pop()!;
                    if (poppedNode.name !== tagContent.substring(1, tagContent.length)) {
                        throw new Error(`Unmatching open tags: ${poppedNode.name}`);
                    }

                    this._current = poppedNode;
                    this._level -= 2;
                } 
                // If it ends with '/' => empty tag
                else if (tagContent[tagContent.length - 1] === '/') {
                    this._current = this._createNode(parentNode);
                    this._current!.tagType = "empty";
                    this._processTagContent(this._current!, tagContent.substring(0, tagContent.length - 1));
                    
                    this._level--;
                }
                // If it start with '?' => 'starting'
                else if (tagContent[0] === '?') {
                    this._current = this._createNode(parentNode);
                    this._current!.tagType = "empty";
                    this._processTagContent(this._current!, tagContent.substring(1, tagContent.length));

                    this._level--;
                }
                // If it has none => opening tag
                else {
                    this._current = this._createNode(parentNode);
                    this._processTagContent(this._current!, tagContent);
                    this._stack.push(this._current);
                }
                
                this._xml_chars = [];
            } else {
                this._xml_chars.push(ch);
            }
        }
    }
}