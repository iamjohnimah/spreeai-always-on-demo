import {mkdirSync,cpSync,copyFileSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const target=process.argv[2];if(!target)throw Error('Provide an empty destination directory under the development store public folder.');
mkdirSync(target,{recursive:true});
rmSync(path.join(target,'online/assets'),{recursive:true,force:true});
for(const dir of ['assets','media'])cpSync(path.join(root,'online',dir),path.join(target,'online',dir),{recursive:true});
const catalog=JSON.parse(readFileSync(path.join(root,'storefront-source/src/always-on/live-catalog.json')));
catalog.push(...JSON.parse(readFileSync(path.join(root,'storefront-source/src/always-on/production-catalog.json'),'utf8')));
for(const route of ['','account','collection',...catalog.map(p=>'product/spree-'+p.id)]){const out=path.join(target,'online',route);mkdirSync(out,{recursive:true});copyFileSync(path.join(root,'online/index.html'),path.join(out,'index.html'))}
cpSync(path.join(root,'experience-selection/assets/fonts'),path.join(target,'experience-selection/assets/fonts'),{recursive:true});
mkdirSync(path.join(target,'always-on-assets'),{recursive:true});for(let i=0;i<5;i++)copyFileSync(path.join(root,`always-on-assets/font-${i}.ttf`),path.join(target,`always-on-assets/font-${i}.ttf`));
copyFileSync(path.join(root,'spreeai-logo.svg'),path.join(target,'spreeai-logo.svg'));
writeFileSync(path.join(target,'README.md'),'# Always On connected preview\n\nGenerated from iamjohnimah/spreeai-always-on-demo, scripts/package-connected-preview.mjs.\nServe only on the development host. Authentication and try-on use api.dev.spreeai.com. Fit maps use the existing same-origin authenticated sizing proxy. No server credentials or user data are bundled. Legacy editorial assets load from the existing public GitHub Pages preview.\n');
