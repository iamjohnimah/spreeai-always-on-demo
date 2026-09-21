import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.vtt':'text/vtt','.ttf':'font/ttf'};
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/'){res.writeHead(302,{Location:'/spreeai-always-on-demo/'});res.end();return}p=p.replace(/^\/spreeai-always-on-demo\/?/,'');let file=path.resolve(root,p);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}try{if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{if(!path.extname(file))file=path.join(root,'index.html');else throw Error('missing')}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(4173,'127.0.0.1',()=>console.log('Demo: http://127.0.0.1:4173/spreeai-always-on-demo/'));
