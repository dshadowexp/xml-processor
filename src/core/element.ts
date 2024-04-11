import { ElementType } from "../types";

//===========================================================//
//========================= XMLElement =========================//
//===========================================================//
export default class XMLElement {
    private _type: ElementType;
    private _level: number;
    private _name: string;
    private _content?: string;
    private _attributes: { name: string, value: string }[];
    private _children: XMLElement[];

    constructor(
        name: string, 
        type: ElementType
    ) {
        this._type = type;
        this._level = 0;
        this._name = name;
        this._attributes = [];
        this._children = [];
        this._content = '';
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
            console.log('called');
            this._children.pop();
        }

        if (typeof index === 'number' && index < this._children.length) {
            this._children.splice(index, 0, child);
            return;
        }

        child._level = this._type === 'root' ? 0 : this._level + 1;
        this._children.push(child);
    }

    getChild(index: number) {
        if (this._children.length < index) {
            return this._children[index];
        }
    }

    toString(): string {
        return this._stringify(this);  
    }

    repr(): string {
        return `<${this._type === 'instruction' ? '?' : ''}${this._name}${this._attrStringify(this)}${this._type === 'empty' ? '/' : ''}>`
    }

    set content(theContent: string) {
        if (this._children.length > 0) return;
        this._content = theContent;
    }

    get name(): string {
        return this._name;
    }

    get content(): string | undefined {
        return this._content;
    }

    private _getMatchingAttr(attrName: string) {
        const matchingAttrs = this._attributes.filter((attr) => {
            return attr.name === attrName;
        });

        return matchingAttrs;
    }

    private _attrStringify(node: XMLElement): string {
        const attrStrings = node._attributes.map((attr) => `${attr.name}="${attr.value}"`);
        return (attrStrings.length > 0 ? ' ' : '') + attrStrings.join(' ');
    }

    private _stringify(node: XMLElement): string {
        const attrString = this._attrStringify(node);

        let joiner = '\n';
        let levelSpacing = ' '.repeat((node._level) * 4);

        switch (node._type) {
            case 'empty': {
                return `${levelSpacing}<${node._name}${attrString}/>`;
            } case 'instruction': {
                return `${levelSpacing}<?${node._name}${attrString}/>`;
            } case 'open': {
                if (node._content) {
                    return `${levelSpacing}<${node._name}${attrString}>${node._content}</${node._name}>`;
                } else {
                    const recursiveString = node._children.map(childNode => this._stringify(childNode)).join(joiner);
                    return `${levelSpacing}<${node._name}${attrString}>${joiner}${recursiveString}${joiner}${levelSpacing}</${node._name}>`;
                }
            } case 'root': {
                return node._children.map(childNode => this._stringify(childNode)).join(joiner);
            }
            default: {
                return '';
            }

        }
    }
}