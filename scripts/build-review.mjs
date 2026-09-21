import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,cpSync,mkdirSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'storefront-source'),out=path.join(root,'rebuild');
execFileSync(process.execPath,['node_modules/typescript/bin/tsc','-b'],{cwd:source,stdio:'inherit'});
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build','--base=/spreeai-always-on-demo/rebuild/'],{cwd:source,stdio:'inherit'});
mkdirSync(out,{recursive:true});cpSync(path.join(source,'dist'),out,{recursive:true});
const html=readFileSync(path.join(out,'index.html'),'utf8');
const ids=[...JSON.parse(readFileSync(path.join(root,'associate/catalog.json'),'utf8')),...JSON.parse(readFileSync(path.join(source,'src/always-on/partner-catalog.json'),'utf8'))].map(p=>p.id);
for(const route of ['collection','account',...ids.map(id=>'product/'+id)]){mkdirSync(path.join(out,route),{recursive:true});writeFileSync(path.join(out,route,'index.html'),html)}
for(const dir of ['associate','journey'])cpSync(path.join(root,dir),path.join(out,dir),{recursive:true});
function adjust(dir){for(const name of readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,name.name);if(name.isDirectory())adjust(file);else if(/\.(html|js|css)$/.test(file)){let s=readFileSync(file,'utf8');s=s.replaceAll('/spreeai-always-on-demo/product/','/spreeai-always-on-demo/rebuild/product/').replaceAll('/spreeai-always-on-demo/associate/','/spreeai-always-on-demo/rebuild/associate/').replaceAll('/spreeai-always-on-demo/collection','/spreeai-always-on-demo/rebuild/collection').replaceAll('/spreeai-always-on-demo/?journey=','/spreeai-always-on-demo/rebuild/?journey=').replaceAll('href="/spreeai-always-on-demo/"','href="/spreeai-always-on-demo/rebuild/"');writeFileSync(file,s)}}}
adjust(path.join(out,'associate'));writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');console.log('Review build ready in rebuild/; existing asset URLs reused.');
