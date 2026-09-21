const ORIGIN='https://vton.dev.spreeai.com';
/** Public dev client identifier from the engineering demo, not a credential. */
export function sdkURL(signedIn:boolean,fit:boolean){const q=new URLSearchParams({garments:JSON.stringify([{garmentId:'odlr-dominican-mixed-floral-wide-leg-pant-bru'}]),partnerId:'demo-site',lng:'EN',partnerConfig:JSON.stringify({spree_accounts_enabled:signedIn,avatars_enabled:true,background_removal_enabled:false,photocapture_enabled:false,photoupload_enabled:signedIn}),clientId:'0176d724-9f01-0000-0100-6d3312d5c396',isDemo:'true',enableProteaGarments:'true',enableAddToCart:'false',legacyAspectRatio:'false',enableNextGenTryOn:'true',enableIntelligentFit:String(fit),enableCanaryMode:'false'});return ORIGIN+'/?'+q}

export function isSdkClose(origin:string,source:unknown,expected:unknown,data:unknown){return expected!=null&&origin===ORIGIN&&source===expected&&!!data&&typeof data==='object'&&'code' in data&&data.code==='00001'}
