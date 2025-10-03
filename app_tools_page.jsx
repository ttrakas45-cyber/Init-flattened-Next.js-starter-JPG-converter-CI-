"use client";import {useState} from"react";
function dl(u,f){const a=document.createElement("a");a.href=u;a.download=f;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);}
export default function Tools(){const[files,setFiles]=useState([]);const[log,setLog]=useState("");
async function pick(e){const list=Array.from(e.target.files||[]);setFiles(list);setLog(`Loaded ${list.length} file(s).`);} 
async function go(){if(!files.length){setLog("No files selected.");return;}let ok=0,fail=0;
for(const f of files){const n=f.name.toLowerCase();if(n.endsWith(".heic")||n.endsWith(".heif")){setLog(p=>p+`\nSkipping ${f.name} (HEIC next build).`);fail++;continue;}
try{const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=URL.createObjectURL(f);});
const c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext("2d").drawImage(img,0,0);
const b=await new Promise(r=>c.toBlob(x=>r(x),"image/jpeg",0.92));const u=URL.createObjectURL(b);dl(u,`${f.name.replace(/\.[^.]+$/,"")}.jpg`);ok++;}catch{fail++;}}
setLog(p=>p+`\nDone. Converted: ${ok}, Failed/Skipped: ${fail}.`);} 
return(<main className='py-12'><h1 className='text-2xl font-bold mb-4'>Tools</h1>
<section className='rounded-2xl p-5' style={{background:'var(--card)'}}>
<h2 className='text-xl font-semibold'>Image → JPG Converter</h2>
<div className='mt-4 flex items-center gap-3'><input type='file' accept='image/*,.heic,.heif' multiple onChange={pick}/>
<button onClick={go} className='px-4 py-2 rounded-xl' style={{background:'rgba(0,0,0,.5)',border:'1px solid rgba(255,255,255,.1)'}}>Convert to JPG</button></div>
<pre className='mt-4 text-xs opacity-80 whitespace-pre-wrap'>{log}</pre></section></main>);}
