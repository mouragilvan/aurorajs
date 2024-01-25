const fs = require('fs');
const path = require('path');

// Get the directory name from command line arguments
const directoryName = process.argv[2];

// Check if the directory name was provided
if (!directoryName) {
  console.error('Please provide a name for the directory.');
  process.exit(1);
}

// Build the directory path
const directoryPath = path.join(__dirname, 'src', directoryName);

// Create the directory
fs.mkdirSync(directoryPath, { recursive: true });

// Function to create files
function createFile(fileName, content) {
  const filePath = path.join(directoryPath, fileName);
  fs.writeFileSync(filePath, content);
  console.log(`File ${fileName} created at ${filePath}`);
}

// Contents of the files to be created
const middlewareContent = `
// Automatically generated file for ${directoryName}

// Implement your middleware functions here
`;

const resourceContent = `
// Automatically generated file for ${directoryName}

// Implement your resource handling functions here
`;

const functionsContent = `
// Automatically generated file for ${directoryName}

// Implement your auxiliary functions here
`;

// Create the files within the directory
createFile(`${directoryName}.middleware.js`, middlewareContent);
createFile(`${directoryName}.resource.js`, resourceContent);
createFile(`${directoryName}.functions.js`, functionsContent);
