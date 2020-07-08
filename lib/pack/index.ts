import * as ejs from 'ejs';
import * as _path from 'path';
import * as fs from 'fs';

async function ensureDir(dir: string): Promise<string> {
  try {
    return await fs.promises.mkdir(_path.dirname(dir), { recursive: true });
  } catch {
    return dir;
  }
}
export class Generator<TData extends ejs.Data> {
  static readonly root = _path.resolve(process.cwd(), 'template');
  static readonly outdir = _path.resolve(process.cwd(), 'public');

  template?: ejs.AsyncTemplateFunction;

  constructor(public path: string) {}

  async load(): Promise<void> {
    const path = _path.join(Generator.root, this.path);

    await fs.promises.access(path, fs.constants.F_OK | fs.constants.R_OK);
    const data = await fs.promises.readFile(path, 'utf-8');

    this.template = ejs.compile(data, {
      async: true,
      root: Generator.root
    });
  }

  async generate(data: TData, filepath?: string): Promise<void> {
    if (this.template) {
      const outpath = _path.join(
        Generator.outdir,
        filepath ?? this.path.replace('.ejs', '')
      );

      const out = await this.template({
        data,
        publicPath: _path.dirname(_path.relative(outpath, Generator.outdir))
      });

      await ensureDir(outpath);

      await fs.promises.writeFile(outpath, out, 'utf-8');
    }
  }
}
