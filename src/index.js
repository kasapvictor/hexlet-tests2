import fs from 'fs/promises';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToFile1 = path.join(__dirname, "..", "__fixtures__", "list.csv");
console.log("pathToFile1", pathToFile1);

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    console.log('DATA', data)
  }
  catch(err) {
    console.log(err)
  }
}

readFile(pathToFile1);
