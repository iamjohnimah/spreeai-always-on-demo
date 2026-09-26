import {useEffect,useRef,useState} from 'react';

export default function PhotoUpload({file,busy,onChange,onError}:{file:File|null;busy:boolean;onChange:(file:File|null)=>void;onError:(message:string)=>void}){
 const input=useRef<HTMLInputElement>(null);
 const [preview,setPreview]=useState('');
 useEffect(()=>{if(!file){setPreview('');return}const url=URL.createObjectURL(file);setPreview(url);return()=>URL.revokeObjectURL(url)},[file]);
 return <div className="photo-upload">
  <input ref={input} className="sr-only" aria-label="Choose your photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>{const next=e.target.files?.[0];e.target.value='';if(!next)return;if(next.size>8*1024*1024||!['image/jpeg','image/png','image/webp'].includes(next.type)){onError('Choose a JPG, PNG or WebP under 8 MB.');return}onChange(next)}}/>
  {file?<div className="upload-preview"><div className="upload-preview-image">{preview&&<img src={preview} alt="Preview of your selected photo"/>}</div><div className="upload-preview-details"><span className="eyebrow">YOUR PHOTO</span><p>{file.name}</p><small>Review your photo before saving your profile.</small><div className="upload-preview-actions"><button type="button" className="text-link" disabled={busy} onClick={()=>input.current?.click()}>Choose another photo</button><button type="button" className="text-link" disabled={busy} onClick={()=>onChange(null)}>Remove photo</button></div></div></div>:<button type="button" className="upload-zone" disabled={busy} onClick={()=>input.current?.click()}><span>＋</span><strong>Choose your photo</strong><small>JPG, PNG or WebP · Up to 8 MB</small></button>}
 </div>
}
