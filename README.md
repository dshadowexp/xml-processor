# xml-processor

xml-processor is a versatile npm package designed to parse XML data in various formats, including string, file, and Express request formats. It provides easy-to-use functions for processing XML data efficiently within your Node.js applications.

## Installation

You can install xml-processor using npm:

```bash
npm install xml-processor
```

## Usage

### Parsing XML from a String

```javascript
const xmlProcessor = require("xml-processor");

const xmlString = "<root><item>Hello</item><item>World</item></root>";

const xmlDocument = xmlProcessor.parseXMLString(xmlString);
```

### Parsing XML from a File

```javascript
const xmlProcessor = require("xml-processor");

const filePath = "path/to/xmlFile.xml";

xmlProcessor
  .parseFile(filePath)
  .then((xmlDocument) => {
    console.log(xmlDocument);
    // Process parsed XML data
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Parsing XML from an Express Request

```javascript
const express = require("express");
const xmlProcessor = require("xml-processor");

const app = express();

app.use(xmlProcessor.parseXMLReq());

app.post("/xml", (req, res) => {
  console.log(req.body);
  res.send("XML processed successfully");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

## API

### `parseString(xmlString: string): XMLDocument`

Parses XML data from a string and returns a JavaScript object representing the parsed data.

xmlString: The XML data as a string.

### `parseFile(filePath: string): Promise<XMLDocument>`

Parses XML data from a file and returns a Promise that resolves to a JavaScript object representing the parsed data.

filePath: The path to the XML file.

### `xmlContentParser()`

Parses XML data from an Express request object and returns a Promise that resolves to a JavaScript object representing the parsed data.

req: The Express request object containing the XML data.

## Types & Objects

### XMLDoc

The `XMLDoc` class represents an XML document in JavaScript or TypeScript. It provides functionality for creating, manipulating, and accessing nodes within an XML structure. This class encapsulates the root node of the XML document and allows users to interact with it by adding nodes, retrieving nodes, and accessing the root node. It serves as a convenient abstraction for working with XML data in a structured and organized manner.

#### Constructor

`new XMLDocument(rootNode: XMLElement)`
Creates a new XMLDocument instance with the specified root node.

- `rootNode`: The root node of the XML document.

#### Methods

`getNode(tagName: string, nodeIndex: number): XMLElement | null`
Gets the node with the specified tag name and index.

- `tagName`: The tag name of the node to retrieve.
- `nodeIndex`: The index of the node within the tag name.

`addNode(tagName: string, node: XMLElement): void`
Adds a node with the specified tag name and node.

- `tagName`: The tag name of the node to add.
- `node`: The node to add.

`get rootNode(): XMLElement`
Gets the root node of the XML document.

### XMLElement

The `XMLElement` class represents an individual element or node within an XML document. It provides functionality for creating, manipulating, and accessing attributes and content of XML elements. This class encapsulates various properties and methods for working with XML elements in a structured manner. It allows users to add, update, and remove attributes, as well as add child elements to the XML structure. Additionally, it offers methods for converting XML elements to string representations in different formats.

#### Constructor

- `new XMLElement(name: string, parent: XMLElement | null, type?: ElementType)`: Creates a new XML element with the specified name, parent element, and optional type.

#### Getters & Setters

- `set name`: Setter for the name property of the XML element.
- `set content`: Setter for the content property of the XML element.
- `set tagType`: Setter for the type property of the XML element.
- `get name`: string: Getter for the name property of the XML element.
- `get content`: string | undefined: Getter for the content property of the XML element.
- `get childNodes`: XMLElement[]: Retrieves the child XML elements.

#### Methods

- `getAttr(attrName: string): string | undefined`: Retrieves the value of the specified attribute.
- `addAttr(attrName: string, attrValue: string, index?: number): void`: Adds a new attribute to the XML element.
- `updateAttr(attrName: string, attrValue: string): void`: Updates the value of an existing attribute.
- `removeAttr(attrName: string): void`: Removes the specified attribute.
- `clearAttrs(): void`: Clears all attributes of the XML element.
- `addChild(child: XMLElement, index?: number): void`: Adds a child XML element to the current element.
- `getChild(index: number): XMLElement | undefined`: Retrieves the child XML element at the specified index.
- `toString(type: StringFormat): string`: Converts the XML element to a string representation in the specified format.

#### Usage

```javascript

```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on the GitHub repository.

## License

xml-processor is licensed under the MIT License. See the LICENSE file for details.

## Support

For support or inquiries, please contact samkofi.appiahkubi@gmail.com.
