import XMLElement from "./element";

//===========================================================//
//========================= XMLDoc ==========================//
//===========================================================//
export default class XMLDoc {
    // Reference to the root node
    private _root: XMLElement;
    // Map of unique tag names and all node occurences
    private _nodeMap: { [key: string]: XMLElement[] };

    constructor(rootNode: XMLElement) {
        this._root = rootNode;
        this._nodeMap = {};
        this._populate(this._root);
    }

    public getNode(tagName: string, nodeIndex: number) {
        if (!this._nodeMap.hasOwnProperty(tagName) || nodeIndex > this._nodeMap[tagName].length - 1) {
            return null;
        }

        return this._nodeMap[tagName][nodeIndex];
    }

    public addNode(tagName: string, node: XMLElement) {
        this._addToMap(tagName, node);
    }

    get rootNode() {
        return this._root;
    }

    private _populate(node: XMLElement) {
        this._addToMap(node.name, node);
        for (const child of node.childNodes) {
            this._populate(child);
        }
    }

    private _addToMap(tagName: string, node: XMLElement) {
        if (this._nodeMap.hasOwnProperty(tagName)) {
            this._nodeMap[tagName].push(node);
        } else {
            this._nodeMap[tagName] = [node];
        }
    }
}