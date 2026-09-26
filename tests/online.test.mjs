import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire,Module} from 'node:module';
import path from 'node:path';
const require=createRequire(import.meta.url);
const ts=require('../storefront-source/node_modules/typescript');
function load(name){const file=path.resolve('storefront-source/src/always-on/'+name+'.ts'),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,file);return m.exports}
const {products,normalizeCatalog}=load('data'),{sdkURL,isSdkClose,SDK_ORIGIN}=load('sdk');
test('catalog has only source-backed garments with original prices and size lists',()=>{assert.equal(products.length,79);assert(products.every(p=>p.garmentId&&p.partnerId&&p.source.length&&p.id==='spree-'+p.garmentId));const p=products[0];assert.equal(p.name,'Knit Maxi Dress');assert.equal(p.priceLabel,'$115.00');assert.deepEqual(p.sizes,['XS','S','M','L','XL']);assert(!products.some(p=>p.id==='leather-jacket'));});
test('each production try-on uses the selected garment and partner',()=>{for(const p of products){const u=new URL(sdkURL(p.garmentId,p.partnerId));assert.equal(u.origin,'https://vton.spreeai.com');assert.deepEqual(JSON.parse(u.searchParams.get('garments')),[{garmentId:p.garmentId}]);assert.equal(u.searchParams.get('partnerId'),p.partnerId);assert.equal(u.searchParams.get('enableAddToCart'),'false')}});
test('catalog rejects unrelated image hosts and retains non-USD display prices',()=>{const row={id:'example',title:'Example',partner_id:'demo-site',variants:[{images:[{tag:'flat',url:'https://evil.example/p.png'}],price:{amount:'€495',currency:'EUR'},size_groups:[{sizes:['FR 34','FR 36']}]}]};assert.deepEqual(normalizeCatalog([row]),[]);row.variants[0].images[0].url='https://assets.spreeai.com/garment.png';const [p]=normalizeCatalog([row]);assert.equal(p.priceLabel,'€495');assert.equal(p.currency,'EUR');assert.deepEqual(p.sizes,['FR 34','FR 36'])});
test('bridge close accepts only the exact production frame',()=>{const frame={};assert(isSdkClose(SDK_ORIGIN,frame,frame,{code:'00001'}));assert(!isSdkClose('https://evil.example',frame,frame,{code:'00001'}));assert(!isSdkClose(SDK_ORIGIN,{},frame,{code:'00001'}));assert(!isSdkClose(SDK_ORIGIN,null,null,{code:'00001'}));assert(!isSdkClose(SDK_ORIGIN,frame,frame,{code:'00002'}))});
