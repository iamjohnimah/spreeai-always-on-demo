import {previewPlan} from './fit-preview';
import {isOneSize,translateSize} from './fit-scale';
import {beginLoading} from './loading';
import {useEffect,useSyncExternalStore} from 'react';
import {currentProfile,useConnectedProfile,render,sizing,fitMap,fitAdvice,hasFitConnection,productionRender,productionSizing} from './connection';
import type {Product} from './data';
import {recordHistory} from './history';
import type {FitMap} from './connection';
export type Result={status:'idle'|'loading'|'ready'|'error';url?:string;recommended?:string;map?:FitMap|null;error?:string;fitNote?:string;recommendationSource?:'chart'|'engine'|'twin'};
const empty:Result={status:'idle'},cache=new Map<string,Result>(),jobs=new Map<string,Promise<void>>(),listeners=new Set<()=>void>();
const notify=()=>listeners.forEach(f=>f());
export const profileScope=()=>{const p=currentProfile();return p.identity?p.version+':'+p.identity.id:''};
export const renderKey=(ids:string[],size='',base='')=>profileScope()+':image:'+ids.join('|')+':'+size+':'+base;
export const cachedImage=(id:string)=>cache.get(renderKey([id]))?.url;
function start(key:string,load:()=>Promise<Partial<Result>>,scope:string){if(!key||cache.has(key)||jobs.has(key))return;cache.set(key,{status:'loading'});notify();const finishLoading=beginLoading();const promise=load().then(value=>{if(scope===profileScope())cache.set(key,{...value,status:'ready'})}).catch(e=>{if(scope===profileScope())cache.set(key,{status:'error',error:e instanceof Error?e.message:'Temporarily unavailable.'})}).finally(()=>{finishLoading();jobs.delete(key);notify()});jobs.set(key,promise)}
function useResult(key:string){return useSyncExternalStore(f=>{listeners.add(f);return()=>{listeners.delete(f)}},()=>key?cache.get(key)||empty:empty)}
export function usePersonalImage(products:Product[],size='',base=''){
 const profile=useConnectedProfile(),identity=profile.identity,scope=profileScope(),ids=products.map(p=>p.garmentId);const usable=identity&&ids.length>0;const key=usable?renderKey(ids,size,base):'';const state=useResult(key);
 useEffect(()=>{if(!identity||!ids.length)return;const timer=setTimeout(()=>start(key,async()=>{if(scope!==profileScope())throw Error('Profile changed');if(products.some(p=>(p.environment||'dev')!==(products[0].environment||'dev')))throw Error('Choose pieces from the same collection for a combined look.');const r=products[0].environment==='prod'?await productionRender(ids,identity,new AbortController().signal,size||undefined,base||undefined):await render(ids,identity,new AbortController().signal,'front',size||undefined,base||undefined);if(scope===profileScope()&&r.image?.url)recordHistory({id:key,kind:size?'sizing':'tryon',identityId:identity.id,identityName:identity.name,pieces:products.map(p=>({id:p.id,name:p.name,image:p.image})),images:[r.image.url],size:size||undefined,recommended:base||undefined});return {url:r.image!.url}},scope),size||ids.length>1?450:0);return()=>clearTimeout(timer)},[key]);return state;
}
export function usePersonalFit(product?:Product){
 const profile=useConnectedProfile(),identity=profile.identity,scope=profileScope(),key=identity&&product&&!isOneSize(product.sizes)?scope+':fit:'+product.garmentId:'';const state=useResult(key);
 useEffect(()=>{if(!identity||!product||isOneSize(product.sizes))return;start(key,async()=>{const [a,b,c]=await Promise.allSettled([(product.environment==='prod'?productionSizing:sizing)(product.garmentId,identity,new AbortController().signal),product.environment!=='prod'&&hasFitConnection()?fitMap(product.garmentId,identity,product.name,product.category,product.sizes):Promise.resolve(null),identity.kind==='photo'&&product.environment!=='prod'&&hasFitConnection()?fitAdvice(product.garmentId,identity,product.name,product.category,product.sizes):Promise.resolve(null)]);const map=b.status==='fulfilled'?b.value:null;const advice=c.status==='fulfilled'?c.value:null;const chart=advice?.size||map?.recommended;const engine=a.status==='fulfilled'?a.value.sizing?.size:undefined;const matched=(value:string|undefined)=>product.sizes.find(s=>s.toUpperCase()===value?.toUpperCase());const recommended=matched(chart)||matched(engine)||(identity.kind==='twin'&&identity.usualSize?translateSize(identity.usualSize,product.sizes):null);const recommendationSource=matched(chart)?'chart':matched(engine)?'engine':'twin';if(!recommended||!product.sizes.includes(recommended))throw Error('Personal sizing isn’t available for this piece yet.');if(scope===profileScope())recordHistory({id:key,kind:'sizing',identityId:identity.id,identityName:identity.name,pieces:[{id:product.id,name:product.name,image:product.image}],images:[],recommended,guidance:fitWords(map,recommended).map(w=>w.point+': '+w.label).join(' · ')});return {recommended,map,recommendationSource,fitNote:advice?.fit_note}},scope)},[key]);return state;
}
export function fitWords(map:FitMap|null|undefined,size:string){return (map?.sizes.find(s=>s.size===size)?.zones||[]).filter(z=>z.verdict).map(z=>({point:z.point.replace(/_/g,' '),label:({true:'True to size',snug:'Close fit',room:'Room to move',loose:'Relaxed fit',too_small:'May feel tight',short:'Shorter length',long:'Longer length'} as Record<string,string>)[z.verdict!]||'Fit guidance'}))}

// Establish the recommended-size render before asking the service to grade it.
export function useSizePreview(product:Product,selectedSize=''){
 const {identity}=useConnectedProfile(),fit=usePersonalFit(product),oneSize=isOneSize(product.sizes);
 const selected=selectedSize||fit.recommended||(oneSize?product.sizes[0]:'');
 const plan=previewPlan(product.sizes,selected,fit.recommended||'');
 const basis=previewPlan(product.sizes,fit.recommended||'',fit.recommended||'');
 const fallback=oneSize||fit.status==='error'&&!selectedSize;
 const anchor=usePersonalImage(identity&&(fallback||fit.recommended&&!basis.reason)?[product]:[],fallback?'':basis.size,fallback?'':basis.base);
 const alternate=usePersonalImage(identity&&!plan.reason&&selected!==fit.recommended&&!oneSize&&anchor.status==='ready'?[product]:[],plan.size,plan.base);
 if(fallback)return {...anchor,reason:'',selected:oneSize?selected:''};
 if(!identity)return {...empty,reason:'Add your profile to discover your fit.',selected};
 if(fit.status==='idle'||fit.status==='loading')return {status:'loading' as const,reason:'',selected};
 if(plan.reason)return {...empty,reason:plan.reason,selected};
 if(selected===fit.recommended||anchor.status==='error')return {...anchor,reason:'',selected};
 if(anchor.status!=='ready')return {status:'loading' as const,reason:'',selected};
 return {...alternate,status:alternate.status==='idle'?'loading' as const:alternate.status,reason:'',selected};
}
