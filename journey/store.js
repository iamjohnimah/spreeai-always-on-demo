// Shared sample data only. Never persist photos, measurements, names or messages here.
export const KEY = 'ao-connected-journey-v1';
export const occasions = ['Everyday edit', 'Wedding guest', 'Weekend away', 'Work event'];
const responses = ['', 'interested', 'fitting', 'question'];
const outcomes = ['', 'keep', 'pass', 'purchased'];
let allowed = new Map();
let memory = null;
let storageUsable = true;
export function configure(products) { allowed = new Map(products.map(p => [p.id, p.sizes])); }
function clean(value) {
  const items = []; const seen = new Set();
  for (const row of Array.isArray(value?.items) ? value.items : []) {
    if (!row || !allowed.has(row.id) || seen.has(row.id) || items.length >= 12) continue;
    seen.add(row.id);
    items.push({id:row.id, size:allowed.get(row.id).includes(row.size) ? row.size : '',
      response:responses.includes(row.response) ? row.response : '', outcome:outcomes.includes(row.outcome) ? row.outcome : '',
      prepared:row.prepared===true, source:['online','vic','store'].includes(row.source) ? row.source : 'online'});
  }
  return {version:1, client:'alex-demo', items, occasion:occasions.includes(value?.occasion) ? value.occasion : occasions[0],
    consent:value?.consent === true, requested:value?.requested === true && value?.consent === true};
}
export function readJourney() {
  if(!storageUsable)return clean(memory);
  let raw;try{raw=localStorage.getItem(KEY)}catch{storageUsable=false;return clean(memory)}
  try{return clean(raw?JSON.parse(raw):null)}catch{return clean(null)}
}
export function changeJourney(edit) {
  const current = readJourney(); edit(current); const next = clean(current); memory = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { storageUsable=false; /* Continue in this tab when storage is unavailable. */ }
  window.dispatchEvent(new CustomEvent('ao-journey-change')); return next;
}
export function togglePiece(id, source = 'online') {
  return changeJourney(j => {
    const existing = j.items.find(x=>x.id===id);
    if (existing) j.items = j.items.filter(x=>x.id!==id);
    else if (j.items.length < 12) j.items.push({id,source,size:'',response:'',outcome:''});
    j.requested = false;
  });
}
export function updatePiece(id, patch, source = 'online') {
  return changeJourney(j => {
    let item = j.items.find(x=>x.id===id);
    if (!item && j.items.length < 12 && allowed.has(id)) { item={id,source,size:'',response:'',outcome:''}; j.items.push(item); }
    if (item) Object.assign(item, patch);
    if(source==='online')j.requested = false;
  });
}
export function resetJourney() { return changeJourney(j=>Object.assign(j,{items:[],occasion:occasions[0],consent:false,requested:false})); }
export function subscribe(fn) {
  const storage=e=>{if(e.key===KEY || e.key===null)fn()};
  window.addEventListener('ao-journey-change',fn);window.addEventListener('storage',storage);
  return ()=>{window.removeEventListener('ao-journey-change',fn);window.removeEventListener('storage',storage)};
}
