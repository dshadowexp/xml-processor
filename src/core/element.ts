import { ElementType, StringFormat } from "../types";

//===========================================================//
//========================= XMLElement =========================//
//===========================================================//
export default class XMLElement {
    private _type: ElementType;
    private _strFormat: StringFormat;
    private _level: number;
    private _name: string;
    private _content?: string;
    private _attributes: { name: string, value: string }[];
    private _parent: XMLElement | null;
    private _children: XMLElement[];

    constructor(
        name: string, 
        parent: XMLElement | null,
        type?: ElementType
    ) {
        this._type = type || 'open';
        this._level = parent !== null ? parent._level + 1 : 0;
        this._name = name;
        this._attributes = [];
        this._parent = parent;
        this._children = [];
        this._content = '';
        this._strFormat = '';
    }

    getAttr(attrName: string): string | undefined {
        const matchingAttrs = this._getMatchingAttr(attrName);

        if (matchingAttrs.length > 0) {
            return matchingAttrs[0].value;
        }

        return undefined;
    }

    addAttr(attrName: string, attrValue: string, index?: number) {
        if (!attrName) {
            return;
        }

        const matchingAttrs = this._getMatchingAttr(attrName);

        if (matchingAttrs.length > 0) {
            return;
        }

        if (index) {
            this._attributes.splice(index, 0, { name: attrName.trim(), value: attrValue.trim()} );
            return;
        }

        this._attributes.push({ name: attrName.trim(), value: attrValue.trim()});
    }

    updateAttr(attrName: string, attrValue: string) {
        if (!attrName) {
            return;
        }

        this._attributes.forEach((attr) => {
            if (attr.name === attrName) {
                attr.value = attrValue;
            }
        });
    }

    removeAttr(attrName: string) {
        const filtered = this._attributes.filter((attr) => {
            return attr.name !== attrName;
        })

        this._attributes = filtered;
    }

    clearAttrs() {
        this._attributes = [];
    }

    addChild(child: XMLElement, index?: number) {
        if (
            this._children.length > 0 
            && this._children[this._children.length - 1]._name === ""
        ) {
            this._children.pop();
        }

        if (typeof index === 'number' && index < this._children.length) {
            this._children.splice(index, 0, child);
            return;
        }

        this._children.push(child);
    }

    getChild(index: number) {
        if (this._children.length < index) {
            return this._children[index];
        }
    }

    toString(type: StringFormat) {
        return this._stringify(this, type);  
    }

    set name(theName: string) {
        this._name = theName;
    }

    set content(theContent: string) {
        if (this._children.length > 0) return;
        this._content = theContent;
    }

    set tagType(theType: ElementType) {
        this._type = theType;
    }

    get name(): string {
        return this._name;
    }

    get content(): string | undefined {
        return this._content;
    }

    get childNodes() {
        return this._children;
    }

    private _getMatchingAttr(attrName: string) {
        const matchingAttrs = this._attributes.filter((attr) => {
            return attr.name === attrName;
        });

        return matchingAttrs;
    }

    private _stringify(node: XMLElement, strType: StringFormat): string {
        if (node._type === 'root') return '';

        const attrStrings = []
        for (let attr of node._attributes) {
            attrStrings.push(`${attr.name}="${attr.value}"`);
        }
        const attrString = (attrStrings.length > 0 ? ' ' : '') + attrStrings.join(' ');

        let joiner = '';
        let levelSpacing = '';
        let toUse = node._strFormat || strType;
        if (strType === 'flat') {
            toUse = 'flat';
        }

        switch(toUse) {
            case 'canonical':
            case 'flat': {
                joiner = '';
                levelSpacing = '';
                break;
            } case 'hierarchy': {
                joiner = '\n';
                levelSpacing = ' '.repeat(node._level * 4);
                break;
            } case 'straight': {
                joiner = '';
                levelSpacing = ' '.repeat(node._level * 4);
                break;
            } default: {
                break;
            }
        }

        switch (node._type) {
            case 'empty': {
                if (strType === 'canonical') {
                    return `<${node._name}${attrString}></${node._name}>`;
                } else if (strType === 'hierarchy') {
                    return `${levelSpacing}<${node._name}${attrString}/>`
                } 

                return `<${node._name}${attrString}/>`;
            } 
            case 'open': {
                if (node._content) {
                    if (strType === 'straight') {
                        return `<${node._name}${attrString}>${joiner}${node._content}</${node._name}>`;
                    }

                    return `${levelSpacing}<${node._name}${attrString}>${node._content}</${node._name}>`;
                } else {
                    const recursiveString = node._children.map(childNode => this._stringify(childNode, toUse)).join(joiner);
                    
                    if (node._strFormat === 'straight') {
                        return `${levelSpacing}<${node._name}${attrString}>${joiner}${recursiveString}</${node._name}>`;
                    }

                    else if (toUse === 'straight') {
                        return `<${node._name}${attrString}>${joiner}${recursiveString}</${node._name}>`;
                    }
 
                    return `${levelSpacing}<${node._name}${attrString}>${joiner}${recursiveString}${joiner}${levelSpacing}</${node._name}>`;
                }
            } 
            default: {
                return '';
            }

        }
    }
}