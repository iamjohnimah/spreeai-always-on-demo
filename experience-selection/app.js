const cards=[...document.querySelectorAll('.experience')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const motion=document.querySelector('.motion');
const next=document.querySelector('#continue');
let paused=reduced.matches;
const routes={online:'https://spreeai.com/demo','in-store':'https://iamjohnimah.github.io/spreeai-always-on-demo/associate/in-store/',vic:'https://iamjohnimah.github.io/spreeai-always-on-demo/associate/vic/'};
const labels={online:'Online','in-store':'In-Store',vic:'VIC'};
const visible=new Set();
function updatePlayback(){cards.forEach(c=>{const v=c.querySelector('video');if(!paused&&!document.hidden&&visible.has(c)){v.play().catch(()=>{});}else v.pause();});motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Play films':'Pause films');motion.querySelector('.motion-label').textContent=paused?'Play films':'Pause films';motion.querySelector('.pause-icon').textContent=paused?'▷':'Ⅱ';}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));updatePlayback();},{threshold:.15});cards.forEach(c=>observer.observe(c));
motion.addEventListener('click',()=>{paused=!paused;updatePlayback();});reduced.addEventListener('change',e=>{paused=e.matches;updatePlayback();});document.addEventListener('visibilitychange',updatePlayback);
cards.forEach((card,i)=>{card.addEventListener('click',()=>{const id=card.dataset.experience;cards.forEach(c=>{const selected=c===card;c.setAttribute('aria-pressed',String(selected));c.querySelector('.selection-mark').textContent=selected?'✓':'↗';});document.querySelector('#selection-status').textContent=labels[id]+' experience selected';document.querySelector('#selection-hint').hidden=true;next.hidden=false;next.href=routes[id];next.replaceChildren(document.createTextNode('Enter '+labels[id]+' experience '));const arrow=document.createElement('span');arrow.textContent='↗';next.append(arrow);document.dispatchEvent(new CustomEvent('spreeai:experience-selected',{detail:{experience:id}}));});card.addEventListener('keydown',e=>{const offset={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(offset){e.preventDefault();cards[(i+offset+cards.length)%cards.length].focus();}});});updatePlayback();
