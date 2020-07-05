import * as crypto from 'crypto';
import { readBinary, readText } from './file';
import * as path from 'path';

export type AssetInfo = {
  Key: int;
  Type: int;
  Name: string;
  Hash: string;
  CrC: int;
  Size: int;
  AssetPaths: string[];
};

export type AssetManifestJSON = {
  AssetInfos: AssetInfo[];
  ResourceInfos?: [];
  Unit?: [];
};

export class AssetManifest {
  list: AssetInfo[] = [];
  path: string;
  hashed: string;

  constructor(p: string) {
    this.path = p;
    this.hashed = path.join(
      path.dirname(p),
      crypto
        .createHash('md5')
        .update(path.basename(p))
        .digest('hex')
    );
  }

  async load(): Promise<void> {
    const data = await readText(this.hashed);
    this.list = (JSON.parse(data) as AssetManifestJSON).AssetInfos;
    this.list.forEach(v => {
      v.AssetPaths = v.AssetPaths.map(p => p.replace('Assets/East/', ''));
    });
  }

  find(file: string): AssetInfo | undefined {
    for (const info of this.list)
      if (info.AssetPaths.find(p => p === file)) return info;

    return undefined;
  }

  async read(info: AssetInfo, check?: boolean): Promise<Buffer>;
  async read(file: string, check?: boolean): Promise<Buffer | undefined>;
  async read(
    asset: string | AssetInfo,
    check = true
  ): Promise<Buffer | undefined> {
    let info;
    if (typeof asset === 'string') {
      info = this.find(asset);
      if (!info) return;
    } else {
      info = asset;
    }

    const bytes = await readBinary(info.Name);

    if (check) {
      const hashed = crypto
        .createHash('md5')
        .update(bytes)
        .digest('hex');
      if (hashed !== info.Hash) {
        throw { checkfailed: true };
      }
    }

    return bytes;
  }
}

export const MasterManifest = new AssetManifest('master_manifest.json');

export const ResourceManifest = new AssetManifest('resource_manifest.json');
