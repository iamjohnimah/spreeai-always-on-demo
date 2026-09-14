import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
let persisted=null;
globalThis.localStorage={getItem:()=>persisted,setItem:(_,v)=>{persisted=v}};
globalThis.window=new EventTarget();
const {configure,readJourney,changeJourney,togglePiece,updatePiece,resetJourney,subscribe}=await import('../journey/store.js');
const products=JSON.parse(readFileSync(new URL('../associate/catalog.json',import.meta.url)));
configure(products);
test('online choices survive VIC and store updates with size, response and outcome intact',()=>{
 resetJourney();togglePiece('leather-jacket','online');updatePiece('leather-jacket',{size:'XXL',response:'fitting'});
 changeJourney(j=>{j.occasion='Wedding guest';j.consent=true;j.requested=true});
 updatePiece('leather-jacket',{prepared:true,outcome:'keep'},'store');const j=readJourney();
 assert.equal(j.items[0].size,'XXL');assert.equal(j.items[0].response,'fitting');assert.equal(j.items[0].outcome,'keep');assert.equal(j.items[0].prepared,true);assert.equal(j.occasion,'Wedding guest');assert.equal(j.consent,true);
});
test('filters unknown IDs, duplicates, malformed sizes, private fields and oversized edits',()=>{
 persisted=JSON.stringify({items:[{id:'leather-jacket',size:'<script>',response:'bad',name:'Private Name',photo:'secret'},{id:'leather-jacket'},{id:'unknown'},...products.map(x=>({id:x.id}))],occasion:'<script>',consent:false,requested:true,photo:'private'});
 const j=readJourney();assert.equal(j.items.length,12);assert.equal(j.items[0].size,'');assert.equal(j.items[0].response,'');assert.equal(j.occasion,'Everyday edit');assert.equal(j.requested,false);assert.ok(!JSON.stringify(j).includes('private'));assert.equal(new Set(j.items.map(x=>x.id)).size,12);
});
test('new selections preserve existing edits and removal clears only the selected piece',()=>{
 resetJourney();togglePiece('knit-polo','vic');updatePiece('knit-polo',{response:'question'});togglePiece('leather-jacket','online');togglePiece('leather-jacket','store');assert.equal(readJourney().items.length,1);assert.equal(readJourney().items[0].response,'question');
});
test('notifies mounted views and recovers from corrupt storage',()=>{
 let calls=0;const stop=subscribe(()=>calls++);persisted='{broken';assert.equal(readJourney().items.length,0);resetJourney();assert.equal(calls,1);stop();resetJourney();assert.equal(calls,1);
});
test('invalid sizes never survive a state write',()=>{resetJourney();updatePiece('knit-polo',{size:'42'},'vic');assert.equal(readJourney().items[0].size,'')});
