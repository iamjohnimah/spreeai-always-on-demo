import {useEffect,useSyncExternalStore} from 'react';
import {currentProfile,useConnectedProfile,render,sizing,fitMap,hasFitConnection,productionRender,productionSizing} from './connection';
import type {Product} from './data';
import {recordHistory} from './history';
import type {FitMap} from './connection';
export type Result={status:'idle'|'loading'|'ready'|'error';url?:string;recommended?:string;map?:FitMap|null;error?:string};
const empty:Result={status:'idle'},cache=new Map<string,Result>(),jobs=new Map<string,Promise<void>>(),listeners=new Set<()=>void>();
const notify=()=>listeners.forEach(f=>f());
export const profileScope=()=>{const p=currentProfile();return p.identity?p.version+':'+p.identity.id:''};
export const renderKey=(ids:string[],size='',base='')=>profileScope()+':image:'+ids.join('|')+':'+size+':'+base;
export const cachedImage=(id:string)=>cache.get(renderKey([id]))?.url;
function start(key:string,load:()=>Promise<Partial<Result>>,scope:string){if(!key||cache.has(key)||jobs.has(key))return;cache.set(key,{status:'loading'});notify();const promise=load().then(value=>{if(scope===profileScope())cache.set(key,{...value,status:'ready'})}).catch(e=>{if(scope===profileScope())cache.set(key,{status:'error',error:e instanceof Error?e.message:'Temporarily unavailable.'})}).finally(()=>{jobs.delete(key);notify()});jobs.set(key,promise)}
function useResult(key:string){return useSyncExternalStore(f=>{listeners.add(f);return()=>{listeners.delete(f)}},()=>key?cache.get(key)||empty:empty)}
export function usePersonalImage(products:Product[],size='',base=''){
 const profile=useConnectedProfile(),identity=profile.identity,scope=profileScope(),ids=products.map(p=>p.garmentId);const usable=identity&&ids.length>0;const key=usable?renderKey(ids,size,base):'';const state=useResult(key);
 useEffect(()=>{if(!identity||!ids.length)return;const timer=setTimeout(()=>start(key,async()=>{if(scope!==profileScope())throw Error('Profile changed');if(products.some(p=>(p.environment||'dev')!==(products[0].environment||'dev')))throw Error('Choose pieces from the same collection for a combined look.');const r=products[0].environment==='prod'?await productionRender(ids,identity,new AbortController().signal,size||undefined,base||undefined):await render(ids,identity,new AbortController().signal,'front',size||undefined,base||undefined);if(scope===profileScope()&&r.image?.url)recordHistory({id:key,kind:size?'sizing':'tryon',identityId:identity.id,identityName:identity.name,pieces:products.map(p=>({id:p.id,name:p.name,image:p.image})),images:[r.image.url],size:size||undefined,recommended:base||undefined});return {url:r.image!.url}},scope),size||ids.length>1?450:0);return()=>clearTimeout(timer)},[key]);return state;
}
export function usePersonalFit(product?:Product){
 const profile=useConnectedProfile(),identity=profile.identity,scope=profileScope(),key=identity&&product?scope+':fit:'+product.garmentId:'';const state=useResult(key);
 useEffect(()=>{if(!identity||!product)return;start(key,async()=>{const [a,b]=await Promise.allSettled([(product.environment==='prod'?productionSizing:sizing)(product.garmentId,identity,new AbortController().signal),product.environment!=='prod'&&hasFitConnection()?fitMap(product.garmentId,identity,product.name,product.category,product.sizes):Promise.resolve(null)]);const map=b.status==='fulfilled'?b.value:null;const recommended=map?.recommended||(a.status==='fulfilled'?a.value.sizing?.size:undefined);if(!recommended||!product.sizes.includes(recommended))throw Error('Personal sizing isn’t available for this piece yet.');if(scope===profileScope())recordHistory({id:key,kind:'sizing',identityId:identity.id,identityName:identity.name,pieces:[{id:product.id,name:product.name,image:product.image}],images:[],recommended,guidance:fitWords(map,recommended).map(w=>w.point+': '+w.label).join(' · ')});return {recommended,map}},scope)},[key]);return state;
}
export function fitWords(map:FitMap|null|undefined,size:string){return (map?.sizes.find(s=>s.size===size)?.zones||[]).filter(z=>z.verdict).map(z=>({point:z.point.replace(/_/g,' '),label:({true:'True to size',snug:'Close fit',room:'Room to move',loose:'Relaxed fit',too_small:'May feel tight',short:'Shorter length',long:'Longer length'} as Record<string,string>)[z.verdict!]||'Fit guidance'}))}
