const cards=[...document.querySelectorAll('.experience')];
const visible=new Set();
// Compensate for the restrained generated motion; keep VIC at its original pace.
const playbackRates={online:1.25,'in-store':1.3,vic:1};
// Films loop without user-facing controls; save work only when not on screen.
function updatePlayback(){
  cards.forEach(card=>{
    const video=card.querySelector('video');
    if(!document.hidden&&visible.has(card)) video.play().catch(()=>{});
    else video.pause();
  });
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target));
  updatePlayback();
},{threshold:.05});
cards.forEach((card,index)=>{
  const video=card.querySelector('video');
  video.defaultPlaybackRate=playbackRates[card.dataset.experience]??1;
  video.playbackRate=video.defaultPlaybackRate;
  observer.observe(card);
  card.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('spreeai:experience-selected',{detail:{experience:card.dataset.experience}})));
  card.addEventListener('keydown',event=>{
    const offset={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[event.key];
    if(offset){event.preventDefault();cards[(index+offset+cards.length)%cards.length].focus();}
  });
});
document.addEventListener('visibilitychange',updatePlayback);
