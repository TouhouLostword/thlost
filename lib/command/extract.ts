import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks';
import { Root } from '../file';
import { MasterManifest } from '../mafinest';
import { Decoder } from '../mastertable/decoder';

async function ensureDir(dir: string): Promise<string> {
  try {
    return await fs.promises.mkdir(path.dirname(dir), { recursive: true });
  } catch {
    return dir;
  }
}

export default class Extract extends Command {
  static description = 'Extract MasterTables';

  static aliases = ['ext'];

  static examples = [
    '$ thlost extract --help',
    '$ thlost extract <source-directory>'
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-o, --outdir=VALUE)
    outdir: flags.string({
      char: 'o',
      description: 'output directory'
    }),
    'no-check': flags.boolean({
      description: 'Avoid checksum before loading',
      default: false
    })
  };

  static args = [
    {
      name: 'source',
      required: true,
      description: 'source directory'
    }
  ];

  async checkArgs(): Promise<{ source: string; dist: string; check: boolean }> {
    const { args, flags } = this.parse(Extract);

    const dist = path.resolve(process.cwd(), flags.outdir ?? 'touhoulostword');
    const source = path.resolve(process.cwd(), args.source);

    try {
      const stat = await fs.promises.stat(source);
      if (!stat.isDirectory()) {
        this.error(`${source} is not a directory.`);
      }
    } catch (err) {
      this.error(`No such directory - ${source}`);
    }

    const check = !flags['no-check'];

    return {
      source,
      dist,
      check
    };
  }

  print(str: string, ms?: number): void {
    if (ms) str += ` - ${ms.toFixed(4)}ms`;
    this.log(str);
  }

  async run(): Promise<void> {
    const { source, dist, check } = await this.checkArgs();
    Root.setRoot(source);

    // checking filelist
    let start = performance.now();
    const hashed: string[] = [];

    for await (const f of await fs.promises.readdir(source)) {
      hashed.push(f);
    }

    let ms = performance.now() - start;
    this.print(`${hashed.length} files found in "${source}".`, ms);

    // init manifests
    start = performance.now();
    try {
      await MasterManifest.load();
    } catch (err) {
      this.error(
        `Failed to load MasterManifest - ${MasterManifest.path} (${MasterManifest.hashed})`
      );
    }
    ms = performance.now() - start;
    this.print('Loading MasterManifest.', ms);

    //
    start = performance.now();
    const foundedMT = MasterManifest.list.filter(info => {
      return !!hashed.find(h => h === info.Name);
    });

    ms = performance.now() - start;
    this.print(
      `${foundedMT.length}/${MasterManifest.list.length} mastertables found.`,
      ms
    );

    start = performance.now();
    const progressBar = cli.progress({
      format: 'progress [{bar}] {value}/{total}'
    });

    progressBar.start(foundedMT.length, 0);

    const corrupted: string[] = [];

    const promises = foundedMT.map(async info => {
      let bytes: Buffer;
      const out = path.join(dist, info.AssetPaths[0]);

      await ensureDir(out);

      try {
        bytes = await MasterManifest.read(info, check);
      } catch (err) {
        err.checkfailed && corrupted.push(info.Name);
        return;
      }

      try {
        const table = await Decoder.unpack(bytes);
        await fs.promises.writeFile(
          out.replace('.bytes', '.json'),
          JSON.stringify(table, null, 2)
        );
      } catch (err) {
        progressBar.stop();
        this.error('Error occurs.');
      }

      progressBar.increment();
    });

    await Promise.all(promises);
    progressBar.stop();

    if (corrupted.length) {
      this.warn(
        `${corrupted.length} files corrupted. [${corrupted.join(', ')}]`
      );
    }

    ms = performance.now() - start;
    this.print(`finish process ${foundedMT.length} mastertables.`, ms);
  }
}
