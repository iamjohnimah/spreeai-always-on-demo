export const BASE=import.meta.env.BASE_URL;
const requested=new URLSearchParams(location.search).get('brand');
let remembered='gucci';try {remembered=sessionStorage.getItem('ao-brand')||'gucci';if(requested==='gucci'||requested==='spreeai'){remembered=requested;sessionStorage.setItem('ao-brand',requested)}}catch{}
export const partner=remembered==='gucci';
export const brand=partner?'GUCCI':'SPREEAI';
export function chooseBrand(value:string,path='collection'){location.href=BASE+path+'?brand='+value}
