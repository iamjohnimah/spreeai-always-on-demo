const cards=[...document.querySelectorAll('.experience')];
const visible=new Set();
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
  observer.observe(card);
  card.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('spreeai:experience-selected',{detail:{experience:card.dataset.experience}})));
  card.addEventListener('keydown',event=>{
    const offset={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[event.key];
    if(offset){event.preventDefault();cards[(index+offset+cards.length)%cards.length].focus();}
  });
});
document.addEventListener('visibilitychange',updatePlayback);
