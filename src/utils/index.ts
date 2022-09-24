import fs from 'fs';
import { resolve } from "path";

//Ler e retorna dados do data.json

export async function readDatabase(context?: string) {
  const source = resolve(__dirname, '..', '..');
  const fileData = fs.readFileSync(`${source}/data.json`, 'utf8');

  // parse JSON string to JSON object
  const data = JSON.parse(fileData);

  if (data && context && data[context]) {
    return data[context];
  }

  return data;
}