import {useSyncExternalStore} from 'react';
import {loadingCount,subscribeLoading} from './loading';
export default function LoadingBar({label='Loading your SPREEAI experience'}:{label?:string}){return <div className="spree-loading" role="status"><span className="spree-loading-name">SPREEAI</span><div className="spree-loading-track"><i/></div><span className="sr-only">{label}</span></div>}
export function GlobalLoading(){const count=useSyncExternalStore(subscribeLoading,loadingCount);return count>0?<div className="global-loading"><LoadingBar/></div>:null}
