import assert from 'node:assert';
import { test, describe } from 'node:test';
import { parseXMLString } from './string';

describe('Extension: String', () => {
    test('successfull parsed', () => {
        const xmlString = '<parent><item>Hello</item><wild one="3"/><section>World</section></parent>';
        const xmlDocument = parseXMLString(xmlString);
        const wildNode = xmlDocument?.getNode('wild', 0);
        wildNode?.addAttr('for', "3")
        assert(xmlDocument != null);
    })
})