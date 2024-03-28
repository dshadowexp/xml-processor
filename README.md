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

const parsedData = xmlProcessor.parseFromString(xmlString);

console.log(parsedData);
// Output: { root: { item: ['Hello', 'World'] } }
```

### Parsing XML from a File

```javascript
const xmlProcessor = require("xml-processor");

const filePath = "path/to/xmlFile.xml";

xmlProcessor
  .parseFromFile(filePath)
  .then((parsedData) => {
    console.log(parsedData);
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

app.post("/xml", (req, res) => {
  xmlProcessor
    .parseFromExpress(req)
    .then((parsedData) => {
      console.log(parsedData);
      // Process parsed XML data
      res.send("XML processed successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error processing XML");
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

## API

### `parseFromString(xmlString: string): XMLDocument`

Parses XML data from a string and returns a JavaScript object representing the parsed data.

xmlString: The XML data as a string.

### `parseFromFile(filePath: string): Promise<XMLDocument>`

Parses XML data from a file and returns a Promise that resolves to a JavaScript object representing the parsed data.

filePath: The path to the XML file.

### `parseFromExpress()`

Parses XML data from an Express request object and returns a Promise that resolves to a JavaScript object representing the parsed data.

req: The Express request object containing the XML data.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on the GitHub repository.

## License

xml-processor is licensed under the MIT License. See the LICENSE file for details.

## Support

For support or inquiries, please contact samkofi.appiahkubi@gmail.com.
