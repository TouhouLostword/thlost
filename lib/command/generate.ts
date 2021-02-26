import { Command, flags } from '@oclif/command';
import { UnitGenerator, parseUnitRecord } from '../pack/unit';
import { DB } from '../mastertable';
import { MasterManifest } from '../mafinest';
import { devConfig, prodConfig } from '../pack/packs';
import webpack = require('webpack');
import { Generator } from '../pack/index';
import { Root } from '../file';

export default class Generate extends Command {
  static description = 'Generate';

  static aliases = ['gen'];

  static examples = [];

  static flags = {
    help: flags.help({ char: 'h' }),
    'no-webpack': flags.boolean({
      description: 'Skip webpack task',
      default: false
    }),
    production: flags.boolean({
      char: 'p',
      default: false,
      description: 'Production mode'
    }),
    tw: flags.boolean({
      description: 'Parse TW Version',
      default: false
    })
  };

  static args = [];

  print(str: string, ms?: number): void {
    if (ms) str += ` - ${ms.toFixed(4)}ms`;
    this.log(str);
  }

  async genAll(
    dir: string,
    aliasFilter?: string | RegExp
  ): Promise<Array<{ name: string; id: int }>> {
    const list = [];
    for (const ur of DB.unit.toArray()) {
      if (aliasFilter) {
        if (
          ur.short_name.match(aliasFilter) ||
          ur.alias_name.match(aliasFilter)
        )
          continue;
      }

      if (ur.id > 9500) continue;

      this.log(ur.name);
      await UnitGenerator.generate(parseUnitRecord(ur), `${dir}/${ur.id}.html`);

      list.push({
        name: ur.name + (ur.alias_name.match('_TEST') ? '_TEST' : ''),
        id: ur.id
      });
    }

    return list;
  }

  async run(): Promise<void> {
    const { flags } = this.parse(Generate);

    if (flags.tw) Root.setRoot('./twassets');

    await UnitGenerator.load();

    await MasterManifest.load();
    await DB.load();

    const wp = flags.production ? webpack(prodConfig) : webpack(devConfig);

    if (!flags.production) {
      const ur = DB.unit.get(1011);
      await UnitGenerator.generate(parseUnitRecord(ur));
    } else {
      const ulg = new Generator<{
        dir: string;
        unit: {
          name: string;
          id: int;
        }[];
      }>('unitlist.html.ejs');

      let list;

      if (!flags.tw) {
        list = await this.genAll('unit', 'なし');
      } else {
        list = await this.genAll('twunit', /(沒有)|(なし)/); // stupid TW version did not translate some Japanese
      }

      await ulg.load();
      await ulg.generate(
        { unit: list, dir: flags.tw ? 'twunit' : 'unit' },
        flags.tw ? 'twunitlist.html' : 'unitlist.html'
      );
    }

    if (!flags['no-webpack'] || flags.production) {
      wp.run((err, stats) => {
        if (err) console.error(err);
        console.log(stats.toString());
      });
    }
  }
}
