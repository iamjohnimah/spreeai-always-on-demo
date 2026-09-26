import {useSyncExternalStore} from 'react';
export type HistoryItem={id:string;kind:'tryon'|'sizing'|'comparison';identityId:string;identityName:string;at:number;pieces:{id:string;name:string;image:string}[];images:string[];size?:string;recommended?:string;guidance?:string};
const key='spree-shopping-history-v1';
function read():HistoryItem[]{try{const data=JSON.parse(sessionStorage.getItem(key)||'[]');return Array.isArray(data)?data:[]}catch{return []}}
let entries=read();const listeners=new Set<()=>void>();
function emit(){try{sessionStorage.setItem(key,JSON.stringify(entries))}catch{}listeners.forEach(f=>f())}
export function recordHistory(item:Omit<HistoryItem,'at'>){const existing=entries.find(x=>x.id===item.id);entries=[{...existing,...item,at:existing?.at||Date.now()},...entries.filter(x=>x.id!==item.id)].sort((a,b)=>b.at-a.at);emit()}
export function clearHistory(){entries=[];emit()}
export function useHistory(){return useSyncExternalStore(f=>{listeners.add(f);return()=>{listeners.delete(f)}},()=>entries)}
