import {useState} from 'react';
const media='/spreeai-always-on-demo/online/media/';
export default function CampaignHero({onSignIn,onShop}:{onSignIn:()=>void;onShop:()=>void}){
 const [scene,setScene]=useState(0);
 const steps=['One sign-in','Your image. Your motion.','Your fit. Everywhere.'];
 return <section className="campaign" aria-label="Always On with Freja">
  <video autoPlay muted loop playsInline disablePictureInPicture controls={false} poster={media+'freja-poster.jpg'} onTimeUpdate={e=>setScene(Math.min(2,Math.floor(e.currentTarget.currentTime/5)))} aria-label="Freja discovers fashion on her laptop, then wears an evening dress and tailored suit" src={media+'freja-always-on.mp4'}/>
  <div className="campaign-shade"/>
  <div className="campaign-copy"><p className="eyebrow">INTRODUCING ALWAYS ON</p><h1>A world of style.<br/><em>Already on you.</em></h1><p>Your likeness, your motion, your fit.<br/>Naturally part of every piece you discover.</p><div className="campaign-actions"><button onClick={onShop}>Explore the collection</button><button onClick={onSignIn}>Try it on you <span>↗</span></button></div></div>
  <div className="campaign-window" aria-label="Always On journey preview"><div className="window-top"><span>MY SPREEAI</span><span><i/> ALWAYS ON</span></div><div className="window-profile"><img src={media+'freja-portrait.jpg'} alt="Freja"/><div><strong>{scene===0?'Welcome back, Freja':scene===1?'Your personal view':'A fit that follows you'}</strong><span>{scene===0?'Your perspective is connected':scene===1?'Still images & motion, already yours':'Across every supported piece'}</span></div><span>✓</span></div><div className="window-pieces"><img src={media+'freja-look.jpg'} alt="Freja wearing a selected look"/><div><span>THE CONSIDERED EDIT</span><strong>{scene===0?'A collection that knows you':scene===1?'See the look on you':'Your suggested size'}</strong><p>{scene===0?'Photo · Motion · Fit profile':scene===1?'Your likeness, woven into browsing':'M · Regular fit'}</p><small>Illustrative preview</small></div></div><div className="campaign-steps">{steps.map((s,i)=><span className={scene===i?'active':''} key={s}>{String(i+1).padStart(2,'0')} <b>{s}</b></span>)}</div></div>
  <span className="campaign-credit">FREJA / THE ALWAYS ON FILM</span>
 </section>
}
