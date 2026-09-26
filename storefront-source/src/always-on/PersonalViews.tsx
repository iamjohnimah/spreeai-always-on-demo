import {Link} from 'react-router';
import type {Product} from './data';
import {useConnectedProfile} from './connection';
import {cachedImage,usePersonalImage} from './personalization';
export const cachedPersonalImage=(garmentId:string,_version?:number,_identityId?:string)=>cachedImage(garmentId);
export default function PersonalViews({product,initial='front'}:{product:Product;initial?:string;onSize?:(size:string)=>void}){
 const {identity}=useConnectedProfile();const image=usePersonalImage(initial==='front'?[product]:[]);
 if(initial==='back'||initial==='video')return <div className="coming-view"><img src={cachedImage(product.garmentId)||product.model} alt=""/><div><span className="soon-pill">Coming soon</span><h2>{initial==='back'?'Every angle.':'Style in motion.'}</h2><p>{initial==='back'?'Back View':'Video try-on'} is on its way.</p></div></div>;
 if(!identity)return <div className="personal-locked"><p className="eyebrow">YOUR PERSPECTIVE STARTS HERE</p><h2>This space is for you.</h2><p>Choose an AI twin or sign in and upload your photo.<br/>Your personal views will appear automatically.</p><Link className="primary" to="/account">Go to My Account ↗</Link></div>;
 return <div className="automatic-view" aria-live="polite">{image.url?<img src={image.url} alt={`${identity.name} wearing ${product.name}`}/>:<><img className="awaiting-view" src={identity.url} alt="Your selected profile — personal garment view loading"/><div className="automatic-status">{image.status==='error'?<p>{image.error}</p>:<><span className="generation-spinner"/><p>Your personal view is appearing…</p></>}</div></>}<span className="personal-credit">{identity.kind==='twin'?`ON ${identity.name.toUpperCase()}`:'ON YOU'} · SPREEAI</span></div>
}
