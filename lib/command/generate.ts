import { Command, flags } from '@oclif/command';
import { UnitGenerator, parseUnitRecord } from '../pack/unit';
import { DB } from '../mastertable';
import { MasterManifest } from '../mafinest';
import { devConfig, prodConfig } from '../pack/packs';
import webpack = require('webpack');

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
    })
  };

  static args = [];

  print(str: string, ms?: number): void {
    if (ms) str += ` - ${ms.toFixed(4)}ms`;
    this.log(str);
  }

  async run(): Promise<void> {
    const { flags } = this.parse(Generate);

    await UnitGenerator.load();

    await MasterManifest.load();
    await DB.load();

    const wp = flags.production ? webpack(prodConfig) : webpack(devConfig);

    if (!flags.production) {
      const ur = DB.unit.get(1023);
      await UnitGenerator.generate(parseUnitRecord(ur));
    } else {
      for (const ur of DB.unit.toArray()) {
        if (!ur.short_name.match('なし') && !ur.alias_name.match('なし')) {
          this.log(ur.name);
          await UnitGenerator.generate(
            parseUnitRecord(ur),
            `unit/${ur.id}.html`
          );
        }
      }
    }

    if (!flags['no-webpack'] || flags.production) {
      wp.run((err, stats) => {
        if (err) console.error(err);
        console.log(stats.toString());
      });
    }
  }
}
