import loadingLogo from './assets/spreeai-wordmark-danel.png';
import {useSyncExternalStore} from 'react';
import {loadingCount,subscribeLoading} from './loading';
export default function LoadingBar({label='Loading your SPREEAI experience'}:{label?:string}){return <div className="spree-loading" role="status"><img className="spree-loading-logo" src={loadingLogo} alt="SPREEAI"/><div className="spree-loading-track" aria-hidden="true"><i/></div><span className="sr-only">{label}</span></div>}
export function GlobalLoading(){const count=useSyncExternalStore(subscribeLoading,loadingCount);return count>0?<div className="global-loading"><LoadingBar/></div>:null}
