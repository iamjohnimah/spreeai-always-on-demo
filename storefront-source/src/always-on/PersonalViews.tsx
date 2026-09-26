import LoadingBar from './LoadingBar';
import {Link} from 'react-router';
import type {Product} from './data';
import {useConnectedProfile} from './connection';
import {cachedImage,useSizePreview} from './personalization';
export const cachedPersonalImage=(garmentId:string,_version?:number,_identityId?:string)=>cachedImage(garmentId);
export default function PersonalViews({product,initial='front',selectedSize=''}:{product:Product;initial?:string;selectedSize?:string;onSize?:(size:string)=>void}){
 const {identity}=useConnectedProfile();const image=useSizePreview(product,initial==='front'?selectedSize:'');const selected=image.selected;
 if(initial==='back'||initial==='video')return <div className="coming-view freja-teaser">{initial==='video'?<video autoPlay muted loop playsInline disablePictureInPicture controls={false} poster="/spreeai-always-on-demo/online/media/freja-motion-poster.jpg" aria-label="Freja modeling — video try-on concept preview, coming soon"><source src="/spreeai-always-on-demo/online/media/freja-coming-soon.mp4" type="video/mp4"/></video>:<img src="/spreeai-always-on-demo/online/media/freja-back-coming-soon.jpg" alt="Freja photographed from behind — Back View concept preview"/>}<span className="teaser-status">Coming soon</span><div className="teaser-caption"><h2>{initial==='back'?'Every angle.':'Style in motion.'}</h2><p>{initial==='back'?'Back View':'Video try-on'} · Featuring Freja</p><small>Concept preview · Not this garment’s personalized result.</small></div></div>;
 if(!identity)return <div className="personal-locked"><p className="eyebrow">YOUR PERSPECTIVE STARTS HERE</p><h2>This space is for you.</h2><p>Choose an AI twin or sign in and upload your photo.<br/>Your personal views will appear automatically.</p><Link className="primary" to="/account">Go to My Account ↗</Link></div>;
 if(image.reason)return <div className="personal-locked"><h2>Size {selected}</h2><p>{image.reason}</p></div>;
 return <div className="automatic-view" aria-live="polite">{image.url?<img src={image.url} alt={`${identity.name} wearing ${product.name}`}/>:<><img className="awaiting-view" src={identity.url} alt="Your selected profile — personal garment view loading"/><div className="automatic-status">{image.status==='error'?<p>{image.error}</p>:<><LoadingBar label="Preparing your personal view"/></>}</div></>}<span className="personal-credit">{identity.kind==='twin'?`ON ${identity.name.toUpperCase()}`:'ON YOU'} {selected?` · SIZE ${selected}`:''} · SPREEAI</span></div>
}
