"use client";
import { useEffect, useState } from "react";

const css = `
:root{--font-display:'Instrument Serif',Georgia,serif;--font-body:'Inter',-apple-system,sans-serif;--ease:cubic-bezier(.22,1,.36,1);--max-w:1080px;--nav-h:64px;--bg:#f8f7f4;--bg-alt:#f0efe9;--bg-surface:#e8e6df;--text-1:#1a1e18;--text-2:#4a5240;--text-3:#7a8068;--accent:#3d6b3d;--accent-dim:rgba(61,107,61,0.08);--border:rgba(0,0,0,0.06);--nav-bg:rgba(248,247,244,0.92);--cta-bg:#3d6b3d;--cta-fg:#fff}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--font-body);background:var(--bg);color:var(--text-1);-webkit-font-smoothing:antialiased;overflow-x:hidden}
nav{position:fixed;top:0;left:0;right:0;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,40px);background:var(--nav-bg);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);z-index:100;border-bottom:1px solid var(--border)}
.logo{font-family:var(--font-display);font-size:clamp(1.5rem,2.4vw,2rem);color:var(--text-1);text-decoration:none}
.waitlist-overlay{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;z-index:200;animation:mb .25s ease}@keyframes mb{from{opacity:0}to{opacity:1}}
.waitlist-modal{width:min(400px,100%);background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:36px 32px;box-shadow:0 20px 50px rgba(0,0,0,.2);text-align:center;animation:mi .3s var(--ease)}@keyframes mi{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
.waitlist-modal h3{font-family:var(--font-display);font-size:1.4rem;font-weight:400;margin-bottom:6px}
.waitlist-modal p{font-size:.88rem;color:var(--text-2);margin-bottom:20px;line-height:1.5}
.waitlist-form{display:flex;flex-direction:column;gap:8px}
.waitlist-form input{padding:12px 16px;border:1px solid var(--border);border-radius:10px;background:var(--bg-alt);color:var(--text-1);font-family:var(--font-body);font-size:.9rem;outline:none}
.waitlist-form input::placeholder{color:var(--text-3)}
.waitlist-form input:focus{border-color:var(--accent)}
.waitlist-form button{padding:12px;border-radius:10px;border:none;background:var(--cta-bg);color:var(--cta-fg);font-family:var(--font-body);font-size:.92rem;font-weight:600;cursor:pointer}
.waitlist-close{margin-top:14px;background:none;border:none;color:var(--text-3);font-size:.82rem;cursor:pointer;font-family:var(--font-body)}.waitlist-close:hover{color:var(--text-1)}
.waitlist-success{color:var(--accent);font-weight:600;font-size:.92rem;padding:16px 0}
.counter-bar{padding:10px 24px;text-align:center;background:var(--accent);color:var(--cta-fg);font-size:.82rem;font-weight:600;letter-spacing:.02em;position:fixed;top:var(--nav-h);left:0;right:0;z-index:99;animation:fu .5s var(--ease) .5s both}.counter-num{font-family:var(--font-display);font-size:1.05rem;font-weight:400;letter-spacing:.01em;display:inline-block;min-width:50px;transition:transform .2s var(--ease)}.counter-bump{animation:cb .3s var(--ease)}@keyframes cb{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
.hero{text-align:center;padding:calc(var(--nav-h) + 110px) 24px 40px}.hero h1{font-family:var(--font-display);font-size:clamp(2.6rem,6vw,4.4rem);font-weight:400;line-height:1.08;letter-spacing:-.03em;max-width:740px;margin:0 auto 20px;text-wrap:balance;animation:fu .7s var(--ease) both}.hero h1 em{font-style:italic;color:var(--accent)}.hero-sub{font-size:clamp(.95rem,1.6vw,1.1rem);color:var(--text-2);max-width:520px;margin:0 auto 32px;line-height:1.6;animation:fu .7s var(--ease) .1s both}.hero-ctas{display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:48px;animation:fu .7s var(--ease) .2s both}
.btn-primary{display:inline-flex;align-items:center;padding:13px 30px;border-radius:99px;border:none;font-family:var(--font-body);font-size:.92rem;font-weight:600;background:var(--cta-bg);color:var(--cta-fg);cursor:pointer;text-decoration:none;transition:all .2s var(--ease)}.btn-primary:hover{opacity:.88;transform:translateY(-1px)}
.btn-phone{display:inline-flex;align-items:center;gap:8px;padding:13px 30px;border-radius:99px;border:2px solid var(--accent);font-family:var(--font-body);font-size:.92rem;font-weight:700;background:transparent;color:var(--accent);cursor:pointer;text-decoration:none;transition:all .2s var(--ease);letter-spacing:.01em}.btn-phone:hover{background:var(--accent);color:var(--cta-fg);transform:translateY(-1px)}
.btn-text{font-size:.9rem;color:var(--text-2);text-decoration:none;border:none;border-bottom:1px solid transparent;transition:all .2s var(--ease);padding:13px 8px;background:none;cursor:pointer;font-family:var(--font-body);font-weight:500}.btn-text:hover{color:var(--text-1);border-bottom-color:var(--text-3)}
@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.phone-wrap{display:flex;justify-content:center;animation:pi 1s var(--ease) .3s both}@keyframes pi{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.iphone{width:270px;height:585px;background:#1a1a1a;border-radius:42px;padding:10px;position:relative;box-shadow:0 40px 80px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);transition:transform .4s var(--ease)}.iphone:hover{transform:translateY(-4px)}.iphone::before{content:'';position:absolute;right:-2px;top:140px;width:3px;height:52px;background:#2a2a2a;border-radius:0 2px 2px 0}.iphone::after{content:'';position:absolute;left:-2px;top:120px;width:3px;height:30px;background:#2a2a2a;border-radius:2px 0 0 2px}
.iphone-screen{width:100%;height:100%;background:#F2F2F7;border-radius:34px;overflow:hidden;display:flex;flex-direction:column;position:relative}.di{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:20;width:86px;height:25px;background:#000;border-radius:16px}.ios-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 22px 0;font-size:11px;font-weight:600;color:#000;min-height:44px;position:relative;z-index:10;background:#F2F2F7;flex-shrink:0}.ios-time{font-size:12px;font-weight:700}.ios-icons{display:flex;gap:4px;align-items:center}.ios-sig{display:flex;gap:1.5px;align-items:flex-end}.ios-sig span{display:block;width:3px;border-radius:.5px;background:#000}.ios-sig span:nth-child(1){height:3px}.ios-sig span:nth-child(2){height:5px}.ios-sig span:nth-child(3){height:7px}.ios-sig span:nth-child(4){height:9px}.ios-bt{display:flex;align-items:center;gap:1px}.ios-bt-b{width:19px;height:8.5px;border:1.2px solid rgba(0,0,0,.35);border-radius:2.5px;position:relative;overflow:hidden}.ios-bt-f{position:absolute;left:1px;top:1px;bottom:1px;width:65%;background:#000;border-radius:1px}.ios-bt-t{width:1.5px;height:4px;background:rgba(0,0,0,.35);border-radius:0 1px 1px 0}
.msg-hdr{display:flex;flex-direction:column;align-items:center;gap:3px;padding:2px 12px 7px;background:#F2F2F7;border-bottom:.5px solid rgba(0,0,0,.1);flex-shrink:0;position:relative}.msg-back{position:absolute;left:16px;color:#007AFF;font-size:17px;line-height:1}.msg-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#5AC8FA,#007AFF);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff}.msg-name{font-size:10px;font-weight:600;color:#000}
.msgs{flex:1;padding:5px 10px 6px;display:flex;flex-direction:column;gap:3px;overflow-y:auto;background:#fff;scrollbar-width:none}.msgs::-webkit-scrollbar{display:none}.m{max-width:80%;padding:6px 10px;border-radius:16px;font-size:12px;line-height:1.35;letter-spacing:-.01em;margin-bottom:1px;flex-shrink:0;opacity:1;transform:none}.m.o{align-self:flex-end;background:#007AFF;color:#fff;border-radius:16px 16px 4px 16px}.m.i{align-self:flex-start;background:#E9E9EB;color:#000;border-radius:16px 16px 16px 4px}.m.v{animation:bub .3s ease forwards}.mt{text-align:center;font-size:8px;color:#8E8E93;padding:3px 0;flex-shrink:0}.md{text-align:right;font-size:8px;color:#8E8E93;padding:1px 4px 3px;flex-shrink:0}
.msg-in{display:flex;align-items:center;gap:5px;padding:5px 9px 16px;background:#F2F2F7;border-top:.5px solid rgba(0,0,0,.08);flex-shrink:0}.msg-field{flex:1;background:#fff;border-radius:16px;padding:6px 12px;font-size:11px;color:#C7C7CC;border:.5px solid rgba(0,0,0,.1)}.msg-send{width:22px;height:22px;border-radius:50%;background:#007AFF;display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff;flex-shrink:0}.ios-home-i{display:flex;justify-content:center;padding:3px 0 2px;background:#F2F2F7;flex-shrink:0}.ios-home-bar{width:100px;height:4px;background:rgba(0,0,0,.12);border-radius:2px}@keyframes bub{to{opacity:1;transform:translateY(0)}}
.hero-quotes{position:relative;max-width:1300px;margin:-40px auto 0;padding:0 16px;min-height:700px}
.quote-card{background:var(--bg-surface);border-radius:14px;padding:18px 20px;position:absolute;width:clamp(220px,22vw,280px);box-shadow:0 4px 20px rgba(0,0,0,.06);opacity:0;transform:translateY(16px);transition:opacity .6s var(--ease),transform .6s var(--ease)}.quote-card.show{opacity:1;transform:translateY(0)}.quote-card::before{content:'\u201C';font-family:var(--font-display);font-size:2.2rem;color:var(--accent);opacity:.25;position:absolute;top:6px;left:14px;line-height:1}.quote-text{font-size:.82rem;line-height:1.55;color:var(--text-1);padding-top:12px;font-style:italic}.quote-name{font-size:.7rem;font-weight:600;color:var(--text-3);margin-top:10px;text-transform:uppercase;letter-spacing:.05em}
.q0{top:20px;left:3%;rotate:-2.5deg}.q1{top:240px;left:1%;rotate:1.8deg}.q2{top:440px;left:5%;rotate:-1.2deg}.q3{top:60px;right:3%;rotate:2.2deg}.q4{top:260px;right:1%;rotate:-1.5deg}.q5{top:480px;right:4%;rotate:2.8deg}
@media(max-width:960px){.hero-quotes{min-height:auto}.quote-card{display:none}}
.tool-strip{padding:40px 24px 0;overflow:hidden}.tool-strip-inner{display:flex;align-items:center;justify-content:center;gap:clamp(28px,5vw,56px);flex-wrap:wrap;max-width:var(--max-w);margin:0 auto;opacity:.6;transition:opacity .3s}.tool-strip-inner:hover{opacity:.85}.tool-icon{height:28px;width:auto;flex-shrink:0;transition:transform .2s}.tool-icon:hover{transform:scale(1.1)}
.proof{padding:28px 24px;text-align:center;border-bottom:1px solid var(--border)}.proof-inner{max-width:var(--max-w);margin:0 auto;display:flex;align-items:center;justify-content:center;gap:clamp(20px,4vw,48px);flex-wrap:wrap}.proof-item{display:flex;align-items:center;gap:8px}.proof-logo{height:22px;opacity:.5;transition:opacity .2s}.proof-logo:hover{opacity:.7}
.lbl{font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}.sec-hd{text-align:center;margin-bottom:36px}.sec-hd h2{font-family:var(--font-display);font-size:clamp(1.4rem,2.8vw,2rem);font-weight:400;letter-spacing:-.02em;text-wrap:balance}
.manifesto{padding:64px 24px;text-align:center}.manifesto-inner{max-width:600px;margin:0 auto}.manifesto p{font-family:var(--font-display);font-size:clamp(1.2rem,2.5vw,1.7rem);line-height:1.5;color:var(--text-1);margin-bottom:16px;letter-spacing:-.01em}.manifesto p span{color:var(--accent);font-style:italic}
.steps{padding:64px 24px;background:var(--bg-alt)}.steps-inner{max-width:var(--max-w);margin:0 auto}.steps-row{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}.si{padding:28px 24px;background:var(--bg-surface);transition:transform .25s var(--ease)}.si:first-child{border-radius:14px 0 0 14px}.si:last-child{border-radius:0 14px 14px 0}.si:hover{transform:translateY(-2px)}.si-n{font-family:var(--font-display);font-size:1.8rem;color:var(--accent);opacity:.5;line-height:1;margin-bottom:12px}.si-t{font-weight:700;font-size:.82rem;letter-spacing:.03em;text-transform:uppercase;color:var(--text-1);margin-bottom:6px}.si-d{font-size:.84rem;line-height:1.5;color:var(--text-2)}
.caps{padding:64px 24px}.caps-inner{max-width:var(--max-w);margin:0 auto}.caps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border-radius:14px;overflow:hidden}.cap{padding:28px 24px;background:var(--bg-surface);transition:transform .25s var(--ease)}.cap:hover{transform:translateY(-2px)}.cap-icon{font-size:1.6rem;margin-bottom:10px}.cap-title{font-family:var(--font-display);font-size:1.1rem;font-weight:400;margin-bottom:6px}.cap-desc{font-size:.82rem;line-height:1.55;color:var(--text-2)}
.pricing-section{padding:64px 24px;background:var(--bg-alt)}.pricing-inner{max-width:var(--max-w);margin:0 auto}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;max-width:840px;margin:0 auto;border-radius:14px;overflow:hidden}.pc{background:var(--bg-surface);padding:32px 24px;display:flex;flex-direction:column}.pc.pop{background:var(--accent-dim)}.pc-t{font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-2);margin-bottom:10px}.pc.pop .pc-t{color:var(--accent)}.pc-a{font-family:var(--font-display);font-size:2.4rem;line-height:1;color:var(--text-1);margin-bottom:4px}.pc-p{font-size:.8rem;color:var(--text-3);margin-bottom:20px}.pc-l{list-style:none;flex:1;margin-bottom:20px}.pc-l li{padding:6px 0;font-size:.84rem;color:var(--text-2)}.pc-l li+li{border-top:1px solid var(--border)}.pc-b{display:block;text-align:center;padding:11px;border-radius:99px;font-family:var(--font-body);font-size:.84rem;font-weight:600;text-decoration:none;border:1.5px solid var(--border);color:var(--text-1);background:transparent;cursor:pointer;margin-top:auto;transition:all .2s var(--ease)}.pc-b:hover{border-color:var(--accent);color:var(--accent)}.pc.pop .pc-b{background:var(--cta-bg);color:var(--cta-fg);border-color:var(--cta-bg)}.pc.pop .pc-b:hover{opacity:.88}
.trust-row{display:flex;justify-content:center;gap:clamp(24px,5vw,64px);flex-wrap:wrap;margin-top:36px}.ti{text-align:center}.ti strong{display:block;font-size:.85rem;font-weight:700;color:var(--text-1);margin-bottom:3px}.ti span{font-size:.78rem;color:var(--text-3)}
.cta-final{padding:72px 24px;text-align:center}.cta-final h2{font-family:var(--font-display);font-size:clamp(1.6rem,3.5vw,2.6rem);font-weight:400;letter-spacing:-.02em;margin-bottom:14px;text-wrap:balance}.cta-final p{color:var(--text-2);font-size:1rem;margin-bottom:28px;line-height:1.6}.cta-final .phone-big{font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.8rem);color:var(--accent);text-decoration:none;display:block;margin-bottom:12px;letter-spacing:-.01em;transition:opacity .2s}.cta-final .phone-big:hover{opacity:.7}.cta-final .phone-hint{font-size:.82rem;color:var(--text-3);margin-bottom:0}
footer{padding:28px 24px;border-top:1px solid var(--border)}.fi{max-width:var(--max-w);margin:0 auto;display:flex;justify-content:space-between;align-items:center}.fl{display:flex;gap:24px;list-style:none}.fl a{font-size:.8rem;color:var(--text-3);text-decoration:none;transition:color .2s}.fl a:hover{color:var(--text-1)}.fn{font-size:.72rem;color:var(--text-3)}
.rv{opacity:1;transform:none;transition:opacity .5s var(--ease),transform .5s var(--ease)}.rv.show{opacity:1;transform:none}
@media(max-width:860px){.hero h1{font-size:clamp(2rem,7vw,3rem)}.steps-row{grid-template-columns:repeat(2,1fr)}.si:first-child{border-radius:14px 0 0 0}.si:nth-child(2){border-radius:0 14px 0 0}.si:nth-child(3){border-radius:0 0 0 14px}.si:last-child{border-radius:0 0 14px 0}.caps-grid{grid-template-columns:1fr}.pg{grid-template-columns:1fr;max-width:360px}.iphone{width:230px;height:500px}}
@media(max-width:540px){.steps-row{grid-template-columns:1fr}.si{border-radius:0!important}.si:first-child{border-radius:14px 14px 0 0!important}.si:last-child{border-radius:0 0 14px 14px!important}.proof-inner{flex-direction:column;gap:12px}.trust-row{flex-direction:column;gap:16px}.fi{flex-direction:column;gap:14px;text-align:center}.fl{flex-wrap:wrap;justify-content:center}.tool-strip-inner{gap:20px}.tool-icon{height:22px}}
@media(prefers-reduced-motion:reduce){*{transition-duration:0ms!important;animation-duration:0ms!important}.rv{opacity:1;transform:none}}
`;

const SU="https://script.google.com/macros/s/AKfycbwZZiYmxWfmUbsuJCYdxfEys8HihaCWUsw4r46OJ-DB1psv2kuqGWS2jeLfGpceZGcO/exec";

const tools=[
  {name:"Gmail",src:"/logos/gmail.svg"},
  {name:"Google Calendar",src:"/logos/gcal.svg"},
  {name:"Google Drive",src:"/logos/gdrive.svg"},
  {name:"Google Docs",src:"/logos/gdocs.svg"},
  {name:"Google Sheets",src:"/logos/gsheets.svg"},
  {name:"Slack",src:"/logos/slack.svg"},
  {name:"Outlook",src:"/logos/outlook.svg"},
  {name:"Notion",src:"/logos/notion.svg"},
  {name:"Zoom",src:"/logos/zoom.svg"},
  {name:"Microsoft Teams",src:"/logos/teams.svg"},
];

// Deterministic counter: same value for everyone at the same moment.
// Increments happen at irregular intervals with a day-part schedule
// tuned to average roughly ~200 increases per day.
function mulberry32(a:number){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const COUNTER_EPOCH=1774396800000; // 2026-03-25T00:00:00Z
const COUNTER_BASE=860; // calibrated to be around 2,031 on 2026-03-30
const COUNTER_SEED=314159;
function getCounterStep(cursor:number,seed:number){
  const rng=mulberry32(seed);
  const r=rng();
  const hour=Math.floor(((COUNTER_EPOCH+cursor)%(86400000))/3600000);
  let minGap:number,maxGap:number;
  if(hour<6){minGap=10*60000;maxGap=18*60000;}               // overnight: slower
  else if(hour>=13&&hour<23){minGap=4*60000;maxGap=7*60000;} // daytime: faster
  else{minGap=6*60000;maxGap=9*60000;}                       // shoulder hours
  const gap=Math.floor(minGap+r*(maxGap-minGap));
  const nextSeed=(seed*16807+1)>>>0;
  return{gap,nextSeed};
}
function getTaskCount():number{
  const elapsed=Math.max(0,Date.now()-COUNTER_EPOCH);
  let count=COUNTER_BASE;
  let cursor=0;
  let seed=COUNTER_SEED;
  while(cursor<elapsed){
    const step=getCounterStep(cursor,seed);
    seed=step.nextSeed;
    cursor+=step.gap;
    if(cursor>elapsed)break;
    count+=1;
  }
  return count;
}
// Returns ms until the next real counter increment event.
function getNextTickMs():number{
  const elapsed=Math.max(0,Date.now()-COUNTER_EPOCH);
  let cursor=0;
  let seed=COUNTER_SEED;
  while(true){
    const step=getCounterStep(cursor,seed);
    seed=step.nextSeed;
    cursor+=step.gap;
    if(cursor>elapsed)return Math.max(1000,cursor-elapsed);
  }
}
export default function Home(){
  const[taskCount,setTaskCount]=useState(0);
  const[bump,setBump]=useState(false);
  const[showWaitlist,setShowWaitlist]=useState(false);
  const[waitlistDone,setWaitlistDone]=useState(false);

  // Initialize and tick the counter at variable intervals
  useEffect(()=>{
    setTaskCount(getTaskCount());
    let tid:ReturnType<typeof setTimeout>;
    const tick=()=>{
      const next=getTaskCount();
      setTaskCount(prev=>{
        if(next>prev)setBump(true);
        return next;
      });
      tid=setTimeout(tick,getNextTickMs());
    };
    tid=setTimeout(tick,getNextTickMs());
    return()=>clearTimeout(tid);
  },[]);

  // Reset bump animation
  useEffect(()=>{
    if(bump){const t=setTimeout(()=>setBump(false),350);return()=>clearTimeout(t);}
  },[bump]);

  useEffect(()=>{document.title="Outdoors"},[]);
  useEffect(()=>{const f=()=>document.getElementById("nav")?.classList.toggle("scrolled",window.scrollY>20);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
  useEffect(()=>{const obs=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add("show")}),{threshold:0,rootMargin:"0px 0px 120px 0px"});document.querySelectorAll(".rv").forEach(el=>obs.observe(el));return()=>obs.disconnect()},[]);
  useEffect(()=>{const t=setTimeout(()=>{const ms=document.getElementById("waChat");if(!ms)return;const bs=ms.querySelectorAll(".m");if(bs[0]?.classList.contains("v"))return;bs.forEach((b,i)=>{setTimeout(()=>{b.classList.add("v");ms.scrollTop=ms.scrollHeight},i*400)})},300);return()=>clearTimeout(t)},[]);
  useEffect(()=>{
    if(!showWaitlist)return;
    const onKey=(ev:KeyboardEvent)=>{if(ev.key==="Escape"){setShowWaitlist(false);setWaitlistDone(false)}};
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[showWaitlist]);

  const steps=[{l:"Text it",d:"Tell Outdoors what you need at Rice: Canvas, Handshake, ESTHER, or email."},{l:"It takes over",d:"It opens your real accounts and handles the clicks."},{l:"It does the work",d:"Submits assignments, sends outreach, and updates docs."},{l:"Done",d:"Finished before your next class starts."}];
  const caps=[
    {icon:"\u2709\uFE0F",t:"Email",d:"Draft and send emails to professors, TAs, labs, and club officers from your Rice Gmail."},
    {icon:"\uD83D\uDCC5",t:"Calendar",d:"Plan classes, labs, office hours, and org meetings without conflicts."},
    {icon:"\uD83D\uDCC4",t:"Documents",d:"Turn notes into polished briefs, scholarship essays, and student org docs."},
    {icon:"\uD83D\uDCCA",t:"Spreadsheets",d:"Track applications, budgets, and recruiting lists in Sheets automatically."},
    {icon:"\uD83D\uDCAC",t:"Messaging",d:"Send follow-ups and status updates without manually typing every message."},
    {icon:"\uD83D\uDCC1",t:"Files",d:"Organize Drive folders for classes, research, and recruiting in minutes."},
  ];

  return(<><style dangerouslySetInnerHTML={{__html:css}}/>
  <nav id="nav"><a href="#" className="logo">Outdoors.rice</a><button className="btn-primary" style={{padding:"9px 22px",fontSize:".84rem"}} onClick={()=>setShowWaitlist(true)}>Join Waitlist</button></nav>
  <div className="counter-bar">Free for .edu {taskCount>0&&<><span className={`counter-num${bump?" counter-bump":""}`}> - {taskCount.toLocaleString()}</span> tasks completed and counting</>}</div>
  <section className="hero">
    <h1>Get off Fizz and get Outdoors.</h1>
    <p className="hero-sub">apply to 20 internships in Handshake and log every status in Sheets, finish tonight's Canvas work: submit assignments, draft discussion replies, and message TAs, every morning at 7:00 AM summarize my inbox and give me a prioritized plan for the day</p>
    <div className="hero-ctas"><a href="sms:8032920205" className="btn-phone">Talk to us: (803) 292-0205</a><a href="#steps" className="btn-text">How it works</a></div>
  </section>
  <div className="hero-quotes">
    <div className="phone-wrap" style={{position:"relative",zIndex:2}}><div className="iphone"><div className="iphone-screen"><div className="di"/><div className="ios-bar"><div className="ios-time">9:15</div><div className="ios-icons"><div className="ios-sig"><span/><span/><span/><span/></div><div className="ios-bt"><div className="ios-bt-b"><div className="ios-bt-f"/></div><div className="ios-bt-t"/></div></div></div><div className="msg-hdr"><span className="msg-back">&lsaquo;</span><div className="msg-av">O</div><div className="msg-name">Outdoors</div></div><div className="msgs" id="waChat"><div className="mt">Today 9:14 AM</div><div className="m o">Email the team I{"'"}ll be 15 min late. Keep it casual.</div><div className="md">Delivered</div><div className="m i">Done. Sent from your Gmail: {"\u201c"}Running ~15 min behind. Start without me.{"\u201d"}</div><div className="m o">Compile all my performative pictures into a file and use them to create a Hinge account.</div><div className="mt">Read 9:14 AM</div><div className="m i">Done. Photos are organized and a Hinge profile draft is ready for review.</div><div className="m o">Build me a landing page.</div><div className="mt">Read 9:15 AM</div><div className="m i">You{"'"}re looking at it.</div></div><div className="msg-in"><div className="msg-field">Message</div><div className="msg-send">+</div></div><div className="ios-home-i"><div className="ios-home-bar"/></div></div></div></div>
    <div className="quote-card rv q0"><div className="quote-text">I gave Outdoors our student org inbox and calendar. It handled sponsor follow-ups and meeting notes while I was in class.</div><div className="quote-name">Rice Student Org Lead</div></div>
    <div className="quote-card rv q1"><div className="quote-text">When Canvas posts a new assignment, it pulls requirements, drafts a plan, and reminds me before the deadline.</div><div className="quote-name">Rice Engineering Student</div></div>
    <div className="quote-card rv q2"><div className="quote-text">It tracks my internship applications, updates my spreadsheet, and sends polite follow-ups automatically.</div><div className="quote-name">Rice Junior</div></div>
    <div className="quote-card rv q3"><div className="quote-text">I used it before recruiting week for resume edits, outreach emails, and interview scheduling in one night.</div><div className="quote-name">Rice Senior</div></div>
    <div className="quote-card rv q4"><div className="quote-text">For pre-med, it summarizes lab emails and builds my daily task list before I wake up.</div><div className="quote-name">Rice Pre-Med Student</div></div>
    <div className="quote-card rv q5"><div className="quote-text">It keeps ESTHER tasks, Canvas deadlines, and org commitments in one queue so nothing slips.</div><div className="quote-name">Rice Sophomore</div></div>
  </div>
  <div className="tool-strip"><div className="tool-strip-inner">{tools.map(t=><img key={t.name} className="tool-icon" src={t.src} alt={t.name} title={t.name}/>)}</div></div>
  <div className="proof"><div className="proof-inner"><div className="proof-item"><img className="proof-logo" src="/logos/rice.svg" alt="Rice University"/></div></div></div>
  <section className="manifesto rv"><div className="manifesto-inner"><p>From Canvas deadlines to recruiting outreach, the students who win are the ones who automate the busywork.</p></div></section>
  <section className="steps" id="steps"><div className="steps-inner"><div className="sec-hd rv"><div className="lbl">How it works</div><h2>You shouldn{"'"}t have to do work a machine can do.</h2></div><div className="steps-row">{steps.map((s,i)=><div key={s.l} className="si rv" style={{transitionDelay:`${i*50}ms`}}><div className="si-n">0{i+1}</div><div className="si-t">{s.l}</div><p className="si-d">{s.d}</p></div>)}</div></div></section>
  <section className="caps"><div className="caps-inner"><div className="sec-hd rv"><div className="lbl">What it does</div><h2>Rice workflows you spend hours on. Handled.</h2></div><div className="caps-grid">{caps.map((c,i)=><div key={c.t} className="cap rv" style={{transitionDelay:`${i*50}ms`}}><div className="cap-icon">{c.icon}</div><div className="cap-title">{c.t}</div><p className="cap-desc">{c.d}</p></div>)}</div></div></section>
  <section className="pricing-section" id="tasks"><div className="pricing-inner"><div className="sec-hd rv"><div className="lbl">Daily limits</div><h2>You get 30 tasks per day, and +10 more per person you refer.</h2></div>
    <div className="trust-row"><div className="ti"><strong>30 tasks/day</strong><span>Included for every Rice student</span></div><div className="ti"><strong>+10 per referral</strong><span>Added for each person you refer</span></div><div className="ti"><strong>Resets daily</strong><span>Fresh task balance every morning</span></div></div>
  </div></section>
  <section className="cta-final" id="cta"><h2 className="rv">Interested? Text the people who built it.</h2><a href="sms:8032920205" className="phone-big rv">(803) 292-0205</a><p className="phone-hint rv">That{"'"}s a real person. Text us right now.</p></section>
  <footer><div className="fi"><span className="logo">outdoors</span><ul className="fl"><li><a href="#steps">Product</a></li><li><a href="#tasks">Daily Limits</a></li></ul><span className="fn">Built at Rice University</span></div></footer>
  {showWaitlist&&<div className="waitlist-overlay" onClick={e=>{if(e.target===e.currentTarget){setShowWaitlist(false);setWaitlistDone(false)}}}>
    <div className="waitlist-modal">
      {waitlistDone?<div className="waitlist-success">You{"'"}re on the list! We{"'"}ll reach out soon.</div>:<>
        <h3>Join the Waitlist</h3>
        <p>Enter your name and Rice email. We{"'"}ll let you know when it{"'"}s your turn.</p>
        <form className="waitlist-form" onSubmit={async e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const name=fd.get("name")as string;const email=fd.get("email")as string;if(!name||!email)return;try{await fetch(SU,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`});setWaitlistDone(true)}catch{setWaitlistDone(true)}}}>
          <input name="name" placeholder="Your name" required/>
          <input name="email" type="email" placeholder="Rice email (.edu)" required/>
          <button type="submit">Get Early Access</button>
        </form>
      </>}
      <button className="waitlist-close" onClick={()=>{setShowWaitlist(false);setWaitlistDone(false)}}>Close</button>
    </div>
  </div>}
  </>)
}



