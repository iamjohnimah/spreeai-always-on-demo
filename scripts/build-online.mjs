import {execFileSync} from 'node:child_process';
import {readFileSync,copyFileSync,readdirSync,mkdirSync,cpSync,rmSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'storefront-source');
execFileSync(process.execPath,['node_modules/typescript/bin/tsc','-b'],{cwd:source,stdio:'inherit'});
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build','--base=/spreeai-always-on-demo/online/'],{cwd:source,stdio:'inherit'});
const out=path.join(root,'online');mkdirSync(out,{recursive:true});rmSync(path.join(out,'assets'),{recursive:true,force:true});cpSync(path.join(source,'dist/assets'),path.join(out,'assets'),{recursive:true});
const catalog=JSON.parse(readFileSync(path.join(source,'src/always-on/live-catalog.json'),'utf8'));
for(const route of ['', 'account','collection',...catalog.map(p=>'product/spree-'+p.id)]){mkdirSync(path.join(out,route),{recursive:true});copyFileSync(path.join(source,'dist/index.html'),path.join(out,route,'index.html'))}
console.log('Published online preview routes; other experiences preserved.');
