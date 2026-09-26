import {useRef} from 'react';
import type {Product} from './data';
import {usePersonalFit} from './personalization';
import {FitOptions,FitSummary} from './FitSelector';
import {sizeLabel} from './fit-scale';
export default function SizeDropdown({product,size,onSize}:{product:Product;size:string;onSize:(size:string)=>void}){
 const disclosure=useRef<HTMLDetailsElement>(null),summary=useRef<HTMLElement>(null);
 const fit=usePersonalFit(product);
 return <div className="size-studio"><details ref={disclosure} onKeyDown={e=>{if(e.key==='Escape'&&disclosure.current){disclosure.current.open=false;summary.current?.focus()}}}><summary ref={summary}><span><small>SELECTED SIZE</small><strong>{size?sizeLabel(size):'Choose your size'}</strong></span><span className="size-studio-status">{size&&size===fit.recommended?(fit.recommendationSource==='twin'?'Reference size':'Recommended for you'):'Explore your fit'}<i aria-hidden="true">⌄</i></span></summary><div className="size-studio-options"><p className="eyebrow">YOUR SIZE. YOUR WAY.</p><h3>Find your kind of fit.</h3><FitOptions product={product} size={size} onSize={value=>{if(disclosure.current)disclosure.current.open=false;summary.current?.focus();onSize(value)}}/><p className="size-studio-guidance">Select a size to see it on you above.</p></div></details><FitSummary product={product} size={size}/></div>
}
