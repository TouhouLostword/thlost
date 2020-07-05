import * as fs from 'fs';
import * as _path from 'path';

export class Root {
  static path: string = _path.join(process.cwd(), 'assets');
  static setRoot(path: string): void {
    this.path = path;
  }
}

export async function readText(path: string): Promise<string> {
  path = _path.join(Root.path, path);

  await fs.promises.access(path, fs.constants.F_OK | fs.constants.R_OK);
  return await fs.promises.readFile(path, 'utf8');
}

export async function readBinary(path: string): Promise<Buffer> {
  path = _path.join(Root.path, path);

  await fs.promises.access(path, fs.constants.F_OK | fs.constants.R_OK);
  return await fs.promises.readFile(path);
}
