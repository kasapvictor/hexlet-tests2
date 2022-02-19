import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import prettier from 'prettier';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { format: beautify } = prettier;
const options = {
	parser: 'html',
	tabWidth: 4,
};

const prettyHtml =  async (filepath) => {
	const data = await fs.readFile(filepath, 'utf-8');
	await fs.writeFile(filepath, beautify(data, options));
};

const tmpDir = os.tmpdir();

const copy = async () => {
	const afterPath = path.join(__dirname, '..', '__fixtures__', 'after.html');
	const beforePath = path.join(__dirname, '..', '__fixtures__', 'before.html');
	
	const dataAfter = await fs.readFile(afterPath, 'utf-8');
	await fs.writeFile(`${tmpDir}/after.html`, dataAfter);
	
	const dataBefore = await fs.readFile(beforePath, 'utf-8');
	await fs.writeFile(`${tmpDir}/before.html`, dataBefore);
	
	return {afterPath :`${tmpDir}/after.html`, beforePath: `${tmpDir}/before.html`};
};

beforeEach(async () => {
	await fs.unlink(`${tmpDir}/after.html`).catch(_.noop);
	await fs.unlink(`${tmpDir}/before.html`).catch(_.noop);
});

test('Check Pretty', async () => {
	const {afterPath, beforePath } = await copy();
	await prettyHtml(beforePath);
	
	const expected = await fs.readFile(afterPath, 'utf-8');
	const actual = await fs.readFile(beforePath, 'utf-8');
	expect(actual).toEqual(expected);
});

test('Check Not Pretty', async () => {
	const { afterPath, beforePath } = await copy();
	const expected = await fs.readFile(afterPath, 'utf-8');
	const actual = await fs.readFile(beforePath, 'utf-8');
	expect(actual).not.toEqual(expected);
});

/* LECTOR */
const getFixturePath = (name) => path.join('__fixtures__', name);

const filename = 'before.html';
const dest = path.join(os.tmpdir(), filename);
const src = getFixturePath(filename);

let expected;

beforeAll(async () => {
	expected = await fs.readFile(getFixturePath('after.html'), 'utf-8');
});

beforeEach(async () => {
	await fs.copyFile(src, dest);
});

test('Lector ->- prettifyHTMLFile', async () => {
	await prettyHtml(dest);
	const actual = await fs.readFile(dest, 'utf-8');
	expect(actual).toBe(expected);
});
