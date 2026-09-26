import {useEffect,useRef,useState} from 'react';
import {stylistAudioUrl,type StylistSpeechKey} from './stylist-speech';
type Recognition={lang:string;continuous:boolean;interimResults:boolean;onresult:((e:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void)|null;onerror:((e:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;stop:()=>void;abort:()=>void};
type SpeechWindow=Window&{SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};
export function useStylistVoice(onText:(text:string)=>void){
 const [speaking,setSpeaking]=useState(false),[listening,setListening]=useState(false),[issue,setIssue]=useState('');
 const ref=useRef<Recognition|null>(null),callback=useRef(onText),enabled=useRef(false),serial=useRef(0),audio=useRef<HTMLAudioElement|null>(null);callback.current=onText;
 const Ctor=typeof window!=='undefined'?((window as SpeechWindow).SpeechRecognition||(window as SpeechWindow).webkitSpeechRecognition):undefined;
 useEffect(()=>()=>{serial.current++;if(ref.current){ref.current.onend=null;ref.current.onerror=null;ref.current.onresult=null;ref.current.abort()}audio.current?.pause();audio.current=null},[]);
 function stop(){serial.current++;if(audio.current){audio.current.pause();audio.current.onended=null;audio.current.onerror=null;audio.current=null}setSpeaking(false)}
 function say(key:StylistSpeechKey,force=false){
  if(!enabled.current&&!force)return;enabled.current=true;stop();ref.current?.abort();setListening(false);setIssue('');
  const id=serial.current,clip=new Audio(stylistAudioUrl(key));audio.current=clip;clip.preload='auto';
  clip.onended=()=>{if(id===serial.current)setSpeaking(false)};
  const fail=()=>{if(id!==serial.current)return;setSpeaking(false);setIssue('The voice could not play. Tap the speaker to retry, or continue on screen.')};clip.onerror=fail;
  void clip.play().then(()=>{if(id===serial.current)setSpeaking(true);else clip.pause()}).catch(fail);
 }
 function listen(){if(listening){ref.current?.stop();return}if(!Ctor){setIssue('Voice input is not supported in this browser. Choose a suggestion or type below.');return}stop();setIssue('');const r=new Ctor();ref.current=r;r.lang='en-US';r.continuous=false;r.interimResults=false;r.onresult=e=>{const text=Array.from(e.results).map(x=>x[0]?.transcript||'').join(' ');if(text.trim())callback.current(text)};r.onerror=e=>{setListening(false);if(e.error!=='aborted')setIssue(e.error==='not-allowed'?'Microphone access was not granted. You can still choose a suggestion or type.':'I couldn’t hear that. Please try again or type your reply.')};r.onend=()=>setListening(false);try{r.start();enabled.current=true;setListening(true)}catch{setListening(false);setIssue('Microphone unavailable. Please use the reply field.')}}
 return {speaking,listening,issue,setIssue,say,stop,listen,canListen:!!Ctor};
}
