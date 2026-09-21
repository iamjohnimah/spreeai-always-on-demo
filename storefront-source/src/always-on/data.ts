import partnerCatalog from './partner-catalog.json';
import {partner} from './brand';
import imported from './catalog.json';
import prepared from './prepared.json';
export type Mode = 'out' | 'twin' | 'personal';
export const twins = [
 {name:'Yuna',height:168,weight:57,size:'S'}, {name:'Alex',height:183,weight:77,size:'M'},
 {name:'Sofia',height:170,weight:86,size:'XL'}, {name:'Ravi',height:178,weight:73,size:'M'},
 {name:'Noa',height:175,weight:64,size:'S'}, {name:'Amara',height:172,weight:89,size:'XL'},
];
const originals = [
 {id:'leather-jacket',name:'The leather biker',category:'Outerwear',price:1890,color:'Noir',row:0,description:'Supple leather. A precise silhouette. An everyday piece with an unmistakable presence.',details:'Black leather • Asymmetric zip closure • Silver-tone hardware • Fully lined • Regular fit',material:'100% leather. Specialist leather cleaning only.'},
 {id:'knit-polo',name:'The merino polo',category:'Knitwear',price:490,color:'Bordeaux',row:2,description:'Quiet texture, rich color. A fine-knit polo with a relaxed line and a beautifully soft hand.',details:'Burgundy merino knit • Open polo collar • Ribbed cuffs and hem • Relaxed fit',material:'100% merino wool. Hand wash cold and dry flat.'},
];
export type Product={id:string;name:string;category:string;price:number;color:string;row:number;description:string;details:string;material:string;image:string;model:string;sizes:string[];source?:string[];preview?:'core'|'look'|'imported'};
const extras:Product[]=[
 {id:'trousers',name:'The tailored trouser',category:'Bottoms',price:650,color:'Ivory',row:0,description:'An effortless line in warm ivory. A foundation for your everyday edit.',details:'Illustrative tailored trouser • Straight leg',material:'Sample collection; composition to be supplied by the retailer.',image:'/always-on-assets/style-2-0.webp',model:'/always-on-assets/style-1-3.webp',sizes:['28','30','32','34','36'],preview:'look'},
 {id:'loafers',name:'The leather loafer',category:'Shoes',price:790,color:'Noir',row:0,description:'A polished finish, from morning through evening.',details:'Illustrative black leather loafer',material:'Sample collection; composition to be supplied by the retailer.',image:'/always-on-assets/style-2-1.webp',model:'/always-on-assets/style-1-3.webp',sizes:['37','38','39','40','41','42','43','44'],preview:'look'},
 {id:'cuff',name:'The sculptural cuff',category:'Accessories',price:280,color:'Silver',row:0,description:'A sculptural accent. A small detail with presence.',details:'Illustrative silver-tone cuff',material:'Sample collection; composition to be supplied by the retailer.',image:'/always-on-assets/style-2-2.webp',model:'/always-on-assets/style-1-3.webp',sizes:['One size'],preview:'look'},
];
export const sampleProducts:Product[]=[...originals.map(p=>({...p,image:`/always-on-assets/${p.id}.webp`,model:`/always-on-assets/person-3-${p.row}.webp`,sizes:['XS','S','M','L','XL','XXL'],preview:'core' as const})),...extras,...imported.map(p=>({...p,preview:prepared.includes(p.id)?'imported' as const:undefined}))];
export const products:Product[]=partner?[...partnerCatalog,...sampleProducts]:sampleProducts;
export const categories=['All','Shirts','Tops','Bottoms','Outerwear','Knitwear','Dresses','Shoes','Accessories'];
export const personalImage=(p:Product,person:number,pose='front')=>{
 if(p.id.startsWith('gucci-'))return null;
 const directed=pose==='pose1'||pose==='left'?1:pose==='pose2'||pose==='right'?2:0;
 if(person===1&&directed)return `/always-on-assets/editorial-${p.id}-alex-${directed}.webp`;
 pose=pose==='pose1'?'left':pose==='pose2'?'right':pose;
 return p.preview==='imported'?`/always-on-assets/${p.id}-${person}-${pose}.webp`:p.preview==='core'?(pose==='front'?asset(person,p.row):pose==='back'?asset(person,p.row===0?1:3):`/always-on-assets/side-${person}-${p.row}-${pose}.webp`):p.preview==='look'?(pose==='front'?`/always-on-assets/style-1-${person}.webp`:`/always-on-assets/look-${person}-${pose}.webp`):null;
};
export const brandPerson=(p:Product)=>[0,2,3,4,5][Array.from(p.id).reduce((n,c)=>n+c.charCodeAt(0),0)%5];
export const displayImage=(p:Product,person:number,active:boolean,personalFirst=true)=>active&&personalFirst?personalImage(p,person)||p.model:personalImage(p,brandPerson(p))||p.model;
export const money=(value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(value);
export const asset=(person:number,row:number)=>`/always-on-assets/person-${person}-${row}.webp`;
export const sampleProfile={name:'Alex',height:183,weight:77,gender:'Male',fit:'Regular',photo:'sample',consent:true};
export type Profile=typeof sampleProfile;

// Editorial views in shopping rails; the PDP and comparisons keep front-facing anchors.
export const editorialImage=(p:Product,person:number,active:boolean)=>active&&person===1?personalImage(p,person,'pose1')||p.model:displayImage(p,person,active);
