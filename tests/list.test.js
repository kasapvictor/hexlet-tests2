import fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = {
	csv: (content) => papa.parse(content).data[0],
	json: JSON.parse,
	yml: yaml.load,
};

const foo = async (file) => {
	const content = await fs.readFile(file, 'utf-8');
	const type = path.extname(file).slice(1);
	const items = parser[type](content)
	const lis = items.map((item) => `  <li>${item}</li>`);
	return `<ul>\n${lis.join('\n')}\n</ul>`;
}

const pathResult = path.join('__fixtures__', 'list.html');
let listHtml;

beforeAll(async () => {
	listHtml = await fs.readFile(pathResult, 'utf-8');
});

test.each([
	{ name: '.yml'},
	{ name: '.csv'},
	{ name: '.json'}
])('Check --- $name', async ({name}) => {
	const filePath = path.join(__dirname, '..', '__fixtures__', `list${name}`);
	expect(await foo(filePath)).toEqual(listHtml.trim());
	// await expect(foo(filePath)).resolves.toEqual(listHtml.trim());
	// await expect(toHtmlList(filePath)).rejects.toEqual('Some text of error'); // for errors
});

