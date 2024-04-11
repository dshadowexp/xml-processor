import { ElementType } from "../types";
import XMLElement from "./element";

//===========================================================//
//========================= XMLDoc ==========================//
//===========================================================//
export default class XMLDoc {
    // Reference to the root node
    private _root: XMLElement;
    // Map of unique tag names and all node occurences
    private _nodeMap: { [key: string]: XMLElement[] };

    constructor() {
        this._root = new XMLElement('_root_', 'root');
        this._nodeMap = {};
    }

    public getNode(nodeName: string, nodeIndex: number) {
        if (!this._nodeMap.hasOwnProperty(nodeName) || nodeIndex > this._nodeMap[nodeName].length - 1) {
            return null;
        }

        return this._nodeMap[nodeName][nodeIndex];
    }

    public addNode(node: XMLElement) {
        this._addToMap(node);
    }

    public toString() {
        return this._root.toString();
    }

    get rootNode() {
        return this._root;
    }

    private _addToMap(node: XMLElement) {
        if (this._nodeMap.hasOwnProperty(node.name)) {
            this._nodeMap[node.name].push(node);
        } else {
            this._nodeMap[node.name] = [node];
        }
    }
}