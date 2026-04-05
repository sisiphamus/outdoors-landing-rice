"use client";
import { useEffect, useState, useRef } from "react";

const css = `
:root{--font-display:'Instrument Serif',Georgia,serif;--font-body:'Inter',-apple-system,sans-serif;--spring:cubic-bezier(.34,1.56,.64,1);--ease:cubic-bezier(.22,1,.36,1);--snappy:cubic-bezier(.25,.46,.45,.94);--max-w:1080px;--nav-h:56px;--bg:#f8f7f4;--bg-alt:#f0efe9;--text-1:rgba(18,26,18,.88);--text-2:rgba(18,26,18,.55);--text-3:rgba(18,26,18,.35);--accent:#3d6b3d;--border:rgba(255,255,255,.45);--shadow-1:inset 0 1px 0 0 rgba(255,255,255,.65),0 1px 2px rgba(20,45,20,.06),0 2px 8px rgba(20,45,20,.08),0 6px 24px rgba(20,45,20,.05);--shadow-2:inset 0 1px 0 0 rgba(255,255,255,.75),inset 0 -1px 0 0 rgba(0,0,0,.05),0 2px 6px rgba(20,45,20,.08),0 8px 24px rgba(20,45,20,.11),0 20px 48px rgba(20,45,20,.07);--shadow-3:inset 0 1px 0 0 rgba(255,255,255,.8),inset 0 -1px 0 0 rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.1),0 16px 40px rgba(0,0,0,.12),0 40px 80px rgba(0,0,0,.08)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--font-body);background:var(--bg);color:var(--text-1);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}

/* ── NAV: floating glass pill ── */
nav{position:fixed;top:12px;left:50%;transform:translateX(-50%);width:min(92%,640px);height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:100;border-radius:9999px;backdrop-filter:blur(40px) saturate(2.2) brightness(1.08);-webkit-backdrop-filter:blur(40px) saturate(2.2) brightness(1.08);background:rgba(248,247,244,.6);border:1px solid rgba(255,255,255,.55);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.8),0 2px 8px rgba(0,0,0,.08),0 8px 24px rgba(0,0,0,.06);transition:background-color .3s var(--snappy),box-shadow .3s var(--snappy)}
nav.scrolled{background:rgba(248,247,244,.82);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.75),0 4px 16px rgba(0,0,0,.12),0 12px 32px rgba(0,0,0,.08)}
#nav-progress{position:absolute;bottom:4px;left:24px;right:24px;height:2px;border-radius:1px;background:linear-gradient(90deg,var(--accent),rgba(61,107,61,.4));width:0%;transition:width .08s linear;opacity:.5}
.logo{font-family:var(--font-display);font-size:1.4rem;color:var(--text-1);text-decoration:none}

/* ── BUTTONS ── */
.btn-primary{display:inline-flex;align-items:center;padding:10px 24px;border-radius:9999px;border:1px solid rgba(255,255,255,.15);font-family:var(--font-body);font-size:.85rem;font-weight:600;background:linear-gradient(180deg,#4a7d4a 0%,#3d6b3d 50%,#336033 100%);color:#fff;cursor:pointer;text-decoration:none;transition:all .25s var(--snappy);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.25),0 1px 3px rgba(0,0,0,.12),0 4px 12px rgba(61,107,61,.3);position:relative;overflow:hidden}.btn-primary::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.12) 0%,rgba(255,255,255,0) 100%);border-radius:9999px 9999px 0 0;pointer-events:none}.btn-primary:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.3),0 2px 6px rgba(0,0,0,.15),0 8px 20px rgba(61,107,61,.35)}.btn-primary:active{transform:translateY(0) scale(.985);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.15),0 1px 3px rgba(0,0,0,.1);transition-duration:80ms}
.btn-phone{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:9999px;border:1.5px solid rgba(61,107,61,.3);font-family:var(--font-body);font-size:.9rem;font-weight:600;background:rgba(61,107,61,.06);color:var(--accent);cursor:pointer;text-decoration:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:all .25s var(--snappy)}.btn-phone:hover{background:var(--accent);color:#fff;border-color:var(--accent);transform:translateY(-1px)}.btn-phone:active{transform:translateY(0) scale(.988);transition-duration:80ms}
.btn-text{font-size:.88rem;color:var(--text-2);text-decoration:none;border:none;padding:12px 8px 14px;background:none;cursor:pointer;font-family:var(--font-body);font-weight:500;background-image:linear-gradient(var(--accent),var(--accent));background-size:0% 1.5px;background-position:0% 100%;background-repeat:no-repeat;transition:background-size .3s var(--ease),color .2s var(--ease)}.btn-text:hover{color:var(--text-1);background-size:100% 1.5px}
.dl-alt{display:flex;gap:16px;justify-content:center;margin-top:14px;flex-wrap:wrap}.dl-alt a{font-size:.84rem;color:var(--text-2);text-decoration:none;padding-bottom:3px;background-image:linear-gradient(var(--accent),var(--accent));background-size:0% 1.5px;background-position:0% 100%;background-repeat:no-repeat;transition:background-size .3s var(--ease),color .2s var(--ease)}.dl-alt a:hover{color:var(--accent);background-size:100% 1.5px}

/* ── COUNTER BAR ── */
.counter-bar{padding:6px 24px;text-align:center;font-size:.72rem;font-weight:400;letter-spacing:.04em;color:var(--text-3);margin-top:calc(var(--nav-h) + 28px)}.counter-num{font-family:var(--font-body);font-size:.72rem;font-weight:500;font-variant-numeric:tabular-nums;color:var(--accent);display:inline-block;min-width:30px;transition:transform .2s var(--ease)}.counter-bump{animation:cb .3s var(--ease)}@keyframes cb{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}

/* ── HERO ── */
.hero{text-align:center;padding:20px 24px 40px}.hero h1{font-family:var(--font-display);font-size:clamp(2.8rem,6.5vw,4.8rem);font-weight:400;line-height:1.12;letter-spacing:-.03em;max-width:780px;margin:0 auto 32px;text-wrap:balance}.hero h1 em{font-style:italic;color:var(--accent)}
@keyframes wordReveal{from{opacity:0;transform:translateY(40px) skewY(3deg)}to{opacity:1;transform:none}}
.hero-word{display:inline-block;animation:wordReveal .65s var(--ease) both}
.hero-benefits{list-style:none;max-width:500px;margin:0 auto 36px;text-align:left;animation:fu .7s var(--ease) .4s both}.hero-benefits li{padding:12px 16px 12px 36px;position:relative;font-size:clamp(.88rem,1.3vw,1rem);color:var(--text-2);line-height:1.55;border-top:1px solid rgba(0,0,0,.06);border-radius:12px;cursor:default;transition:background-color .25s var(--snappy),color .25s var(--snappy),box-shadow .25s var(--snappy)}.hero-benefits li:hover{background:rgba(61,107,61,.06);color:var(--text-1);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.5),0 2px 8px rgba(20,45,20,.06);border-top-color:transparent}.hero-benefits li:hover::before{transform:translateX(3px)}.hero-benefits li::before{content:'\\2192';position:absolute;left:12px;color:var(--accent);font-size:.85rem;top:13px;transition:transform .25s var(--snappy)}
.hero-ctas{display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:56px;animation:fu .7s var(--ease) .5s both}
@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

/* ── PHONE ── */
.phone-wrap{display:flex;justify-content:center;padding:0 24px;animation:pi 1s var(--ease) .3s both}@keyframes pi{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:none}}
.iphone{width:270px;height:585px;background:#1a1a1a;border-radius:44px;padding:10px;position:relative;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 20px 60px rgba(0,0,0,.2),0 40px 100px rgba(0,0,0,.12);transition:transform .5s var(--ease)}.iphone:hover{transform:translateY(-6px) scale(1.01)}
.iphone::before{content:'';position:absolute;right:-2px;top:140px;width:3px;height:52px;background:#2a2a2a;border-radius:0 2px 2px 0}.iphone::after{content:'';position:absolute;left:-2px;top:120px;width:3px;height:30px;background:#2a2a2a;border-radius:2px 0 0 2px}
.iphone-screen{width:100%;height:100%;background:#F2F2F7;border-radius:36px;overflow:hidden;display:flex;flex-direction:column;position:relative}.di{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:20;width:86px;height:25px;background:#000;border-radius:16px}
.ios-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 22px 0;font-size:11px;font-weight:600;color:#000;min-height:44px;position:relative;z-index:10;background:#F2F2F7;flex-shrink:0}.ios-time{font-size:12px;font-weight:700}.ios-icons{display:flex;gap:4px;align-items:center}.ios-sig{display:flex;gap:1.5px;align-items:flex-end}.ios-sig span{display:block;width:3px;border-radius:.5px;background:#000}.ios-sig span:nth-child(1){height:3px}.ios-sig span:nth-child(2){height:5px}.ios-sig span:nth-child(3){height:7px}.ios-sig span:nth-child(4){height:9px}.ios-bt{display:flex;align-items:center;gap:1px}.ios-bt-b{width:19px;height:8.5px;border:1.2px solid rgba(0,0,0,.35);border-radius:2.5px;position:relative;overflow:hidden}.ios-bt-f{position:absolute;left:1px;top:1px;bottom:1px;width:65%;background:#000;border-radius:1px}.ios-bt-t{width:1.5px;height:4px;background:rgba(0,0,0,.35);border-radius:0 1px 1px 0}
.msg-hdr{display:flex;flex-direction:column;align-items:center;gap:3px;padding:2px 12px 7px;background:#F2F2F7;border-bottom:.5px solid rgba(0,0,0,.1);flex-shrink:0;position:relative}.msg-back{position:absolute;left:16px;color:#007AFF;font-size:17px;line-height:1}.msg-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#5AC8FA,#007AFF);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff}.msg-name{font-size:10px;font-weight:600;color:#000}
.msgs{flex:1;padding:5px 10px 6px;display:flex;flex-direction:column;gap:3px;overflow-y:auto;background:#fff;scrollbar-width:none}.msgs::-webkit-scrollbar{display:none}.m{max-width:80%;padding:6px 10px;border-radius:16px;font-size:12px;line-height:1.35;letter-spacing:-.01em;margin-bottom:1px;flex-shrink:0;opacity:1;transform:none}.m.o{align-self:flex-end;background:#007AFF;color:#fff;border-radius:16px 16px 4px 16px}.m.i{align-self:flex-start;background:#E9E9EB;color:#000;border-radius:16px 16px 16px 4px}.m.v{animation:bub .3s ease forwards}.mt{text-align:center;font-size:8px;color:#8E8E93;padding:3px 0;flex-shrink:0}.md{text-align:right;font-size:8px;color:#8E8E93;padding:1px 4px 3px;flex-shrink:0}
.msg-in{display:flex;align-items:center;gap:5px;padding:5px 9px 16px;background:#F2F2F7;border-top:.5px solid rgba(0,0,0,.08);flex-shrink:0}.msg-field{flex:1;background:#fff;border-radius:16px;padding:6px 12px;font-size:11px;color:#C7C7CC;border:.5px solid rgba(0,0,0,.1)}.msg-send{width:22px;height:22px;border-radius:50%;background:#007AFF;display:flex;align-items:center;justify-content:center;font-size:13px;color:#fff;flex-shrink:0}.ios-home-i{display:flex;justify-content:center;padding:3px 0 2px;background:#F2F2F7;flex-shrink:0}.ios-home-bar{width:100px;height:4px;background:rgba(0,0,0,.12);border-radius:2px}@keyframes bub{to{opacity:1;transform:translateY(0)}}

/* ── TOOL STRIP ── */
.tool-strip{padding:48px 0 0;overflow:hidden}.tool-track{display:flex;width:max-content;will-change:transform}.tool-track:hover{animation-play-state:paused}.tool-set{display:flex;align-items:center;gap:48px;padding-right:48px;flex-shrink:0}.tool-icon{height:26px;width:auto;flex-shrink:0;opacity:.4;transition:opacity .25s var(--snappy),transform .25s var(--snappy)}.tool-icon:hover{opacity:.8;transform:scale(1.12)}

/* ── PROOF ── */
.proof{padding:24px 24px;text-align:center}.proof-inner{max-width:var(--max-w);margin:0 auto;display:flex;align-items:center;justify-content:center}.proof-logo{height:20px;opacity:.4;transition:opacity .2s}.proof-logo:hover{opacity:.65}

/* ── SECTION SHARED ── */
.lbl{font-size:.7rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}.sec-hd{text-align:center;margin-bottom:40px}.sec-hd h2{font-family:var(--font-display);font-size:clamp(1.6rem,3.2vw,2.6rem);font-weight:400;letter-spacing:-.03em;text-wrap:balance;color:var(--text-1)}

/* ── MANIFESTO: dark + glass card ── */
.manifesto{padding:clamp(80px,14vw,160px) 24px;text-align:center;background:#141a14;position:relative;overflow:hidden}
.manifesto::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 40%,rgba(61,107,61,.12),transparent 70%);pointer-events:none}
.manifesto-glass{max-width:780px;margin:0 auto;padding:clamp(40px,6vw,64px) clamp(28px,5vw,48px);border-radius:28px;backdrop-filter:blur(24px) saturate(1.6) brightness(.8);-webkit-backdrop-filter:blur(24px) saturate(1.6) brightness(.8);background:rgba(18,24,18,.75);border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.16),inset 0 -1px 0 0 rgba(0,0,0,.3),0 4px 16px rgba(0,0,0,.45),0 16px 48px rgba(0,0,0,.3);position:relative;overflow:hidden}
.manifesto-glass::before{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,rgba(100,160,100,.08) 0%,rgba(100,160,100,0) 30%);pointer-events:none}
.manifesto-glass p{font-family:var(--font-display);font-size:clamp(1.8rem,4.5vw,3.2rem);line-height:1.25;color:rgba(255,255,255,.92);letter-spacing:-.03em;text-shadow:0 1px 4px rgba(0,0,0,.25);position:relative;z-index:1}
.manifesto-glass p span{color:#8ab98a;font-style:italic}
.busy-rotate{display:inline-block;width:clamp(200px,26vw,360px);text-align:left;cursor:default;vertical-align:baseline;height:1.3em}.busy-word{display:inline-block;animation:busyIn .25s var(--ease) both}@keyframes busyIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

/* ── STEPS: glass cards ── */
.steps{padding:clamp(72px,10vw,110px) 24px}.steps-inner{max-width:var(--max-w);margin:0 auto}
.steps-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.si{padding:32px 24px;border-radius:20px;position:relative;overflow:hidden;isolation:isolate;backdrop-filter:blur(20px) saturate(1.6) brightness(1.04);-webkit-backdrop-filter:blur(20px) saturate(1.6) brightness(1.04);background:rgba(248,247,244,.78);background-image:linear-gradient(145deg,rgba(255,255,255,.15) 0%,rgba(255,255,255,.04) 60%,rgba(61,107,61,.03) 100%);border:1px solid var(--border);box-shadow:var(--shadow-1);transition:transform .25s var(--snappy),box-shadow .25s var(--snappy),background-color .25s var(--snappy)}
.si::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.8) 30%,rgba(255,255,255,.8) 70%,rgba(255,255,255,0) 100%);pointer-events:none}
.si:hover{transform:translateY(-3px);box-shadow:var(--shadow-2);background-color:rgba(255,255,255,.8)}
.si:active{transform:translateY(0) scale(.988);transition-duration:80ms}
.si-n{font-family:var(--font-display);font-size:clamp(4.5rem,10vw,7rem);color:var(--accent);opacity:.1;line-height:.85;letter-spacing:-.05em;margin-bottom:8px}.si-t{font-weight:600;font-size:.95rem;color:var(--text-1);margin-bottom:6px;position:relative}.si-d{font-size:.84rem;line-height:1.55;color:var(--text-2);position:relative}
.si-img{background-size:cover!important;background-position:center!important;min-height:180px}.si-img .si-n{color:#000;opacity:.2;text-shadow:none}.si-img .si-t{color:#fff;font-size:1.1rem;text-shadow:0 1px 6px rgba(0,0,0,.4)}.si-img::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.35) 100%);pointer-events:none}

/* ── CAPABILITIES: glass bento ── */
.caps{padding:clamp(72px,10vw,110px) 24px clamp(40px,6vw,64px)}.caps-inner{max-width:var(--max-w);margin:0 auto}
.caps-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.cap{padding:28px 24px;border-radius:20px;position:relative;overflow:hidden;isolation:isolate;backdrop-filter:blur(20px) saturate(1.6) brightness(1.04);-webkit-backdrop-filter:blur(20px) saturate(1.6) brightness(1.04);border:1px solid var(--border);box-shadow:var(--shadow-1);transition:transform .25s var(--snappy),box-shadow .25s var(--snappy),background-color .25s var(--snappy)}
.cap::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.7) 30%,rgba(255,255,255,.7) 70%,rgba(255,255,255,0) 100%);pointer-events:none}
.cap:hover{transform:translateY(-3px);box-shadow:var(--shadow-2)}.cap:active{transform:translateY(0) scale(.988);transition-duration:80ms}
.cap:nth-child(1){grid-column:span 3}.cap:nth-child(2){grid-column:span 3}.cap:nth-child(3){grid-column:span 2}.cap:nth-child(4){grid-column:span 2}.cap:nth-child(5){grid-column:span 2}.cap:nth-child(6){grid-column:span 3}.cap:nth-child(7){grid-column:span 3}
.cap{background:rgba(248,247,244,.78);background-image:linear-gradient(145deg,rgba(255,255,255,.15) 0%,rgba(255,255,255,.04) 60%,rgba(61,107,61,.02) 100%)}
.cap-icon{height:24px;width:auto;margin-bottom:10px;opacity:.8}.cap-title{font-family:var(--font-display);font-size:1.15rem;font-weight:400;color:var(--text-1)}

/* ── CTA FINAL ── */
.cta-final{padding:clamp(48px,8vw,80px) 24px;text-align:center}.cta-final h2{font-family:var(--font-display);font-size:clamp(1.8rem,4vw,3rem);font-weight:400;letter-spacing:-.03em;margin-bottom:8px;text-wrap:balance;color:var(--text-1);line-height:1.2}.cta-final>p{color:var(--text-2);font-size:.95rem;margin-bottom:28px;line-height:1.6}
.nature-word{display:inline-block;width:clamp(140px,20vw,260px);height:clamp(2.2rem,5vw,3.8rem);border-radius:clamp(8px,1.2vw,14px);overflow:hidden;vertical-align:bottom;position:relative}.nature-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;animation:natureIn .5s var(--ease) both}@keyframes natureIn{from{opacity:0;transform:scale(1.05)}to{opacity:1;transform:scale(1)}}
.cta-final .limits{font-family:var(--font-display);font-size:clamp(1rem,1.8vw,1.25rem);color:var(--text-2);margin-bottom:32px;letter-spacing:-.01em}.cta-final .limits strong{color:var(--accent);font-weight:400}
.cta-final .phone-big{font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2.2rem);color:var(--accent);text-decoration:none;display:block;margin-bottom:8px;letter-spacing:-.01em;transition:opacity .2s}.cta-final .phone-big:hover{opacity:.7}.cta-final .phone-hint{font-size:.8rem;color:var(--text-3);margin-bottom:0}

/* ── FOOTER ── */
footer{padding:24px 24px;border-top:1px solid rgba(0,0,0,.04)}.fi{max-width:var(--max-w);margin:0 auto;display:flex;justify-content:space-between;align-items:center}.fl{display:flex;gap:24px;list-style:none}.fl a{font-size:.78rem;color:var(--text-3);text-decoration:none;padding-bottom:3px;background-image:linear-gradient(var(--accent),var(--accent));background-size:0% 1.5px;background-position:0% 100%;background-repeat:no-repeat;transition:background-size .3s var(--ease),color .2s var(--ease)}.fl a:hover{color:var(--text-1);background-size:100% 1.5px}.fn{font-size:.7rem;color:var(--text-3)}

/* ── DOWNLOAD MODAL ── */
.dl-overlay{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;z-index:200;animation:dlFadeIn .2s ease}@keyframes dlFadeIn{from{opacity:0}to{opacity:1}}
.dl-modal{width:min(420px,100%);border-radius:24px;padding:36px 32px;text-align:center;backdrop-filter:blur(24px) saturate(1.8) brightness(1.05);-webkit-backdrop-filter:blur(24px) saturate(1.8) brightness(1.05);background:rgba(248,247,244,.85);border:1px solid rgba(255,255,255,.55);box-shadow:inset 0 1px 0 0 rgba(255,255,255,.8),0 8px 32px rgba(0,0,0,.15),0 24px 64px rgba(0,0,0,.1);animation:dlSlideIn .3s var(--ease)}@keyframes dlSlideIn{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
.dl-modal h3{font-family:var(--font-display);font-size:1.5rem;font-weight:400;margin-bottom:6px;color:var(--text-1)}.dl-modal p{font-size:.88rem;color:var(--text-2);margin-bottom:20px;line-height:1.5}
.dl-options{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.dl-opt{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:16px;border:1.5px solid rgba(0,0,0,.06);background:rgba(255,255,255,.5);text-decoration:none;color:var(--text-1);font-family:var(--font-body);font-size:.9rem;font-weight:500;transition:all .2s var(--snappy);cursor:pointer}
.dl-opt:hover{background:rgba(255,255,255,.8);border-color:rgba(255,255,255,.6);box-shadow:var(--shadow-1);transform:translateY(-1px)}
.dl-opt.active{border-color:var(--accent);background:rgba(61,107,61,.06);box-shadow:0 0 0 3px rgba(61,107,61,.12)}
.dl-opt-icon{font-size:1.4rem;flex-shrink:0;width:28px;text-align:center}.dl-opt-info{flex:1;text-align:left}.dl-opt-name{font-weight:600;font-size:.9rem}.dl-opt-note{font-size:.75rem;color:var(--text-3);margin-top:2px}
.dl-close{margin-top:8px;background:none;border:none;color:var(--text-3);font-size:.82rem;cursor:pointer;font-family:var(--font-body);transition:color .2s}.dl-close:hover{color:var(--text-1)}

/* ── SCROLL REVEAL ── */
.rv{opacity:0;transform:translateY(20px);transition:opacity .6s var(--ease),transform .6s var(--ease)}.rv.show{opacity:1;transform:none}

/* ── RESPONSIVE ── */
@media(max-width:860px){.hero h1{font-size:clamp(2.4rem,8vw,3.4rem)}.steps-row{grid-template-columns:repeat(2,1fr)}.caps-grid{grid-template-columns:repeat(2,1fr)}.cap:nth-child(n){grid-column:span 1}.cap:nth-child(7){grid-column:span 2}.iphone{width:230px;height:500px}nav{width:min(95%,500px)}}
@media(max-width:540px){.hero h1{font-size:clamp(2.2rem,9vw,3rem);letter-spacing:-.04em}.steps-row{grid-template-columns:1fr}.caps-grid{grid-template-columns:repeat(2,1fr);gap:8px}.cap{padding:20px 16px;border-radius:16px}.cap-title{font-size:1rem}.proof-inner{flex-direction:column;gap:12px}.fi{flex-direction:column;gap:14px;text-align:center}.fl{flex-wrap:wrap;justify-content:center}.tool-set{gap:24px;padding-right:24px}.tool-icon{height:22px}.hero-benefits{max-width:340px;margin-left:auto;margin-right:auto}nav{top:8px;width:min(96%,400px);padding:0 16px;height:48px}.logo{font-size:1.2rem}}
@media(prefers-reduced-motion:reduce){*{transition-duration:0ms!important;animation-duration:0ms!important}.rv{opacity:1;transform:none}.hero-word{opacity:1;transform:none}.tool-track{animation:none!important}}
@supports not(backdrop-filter:blur(1px)){.si,.cap,.manifesto-glass,nav{background:rgba(240,244,240,.96)!important;border:1px solid rgba(61,107,61,.15)!important;backdrop-filter:none!important}}
`;

const REPO="sisiphamus/Outdoors";
const DL_BASE=`https://github.com/${REPO}/releases/latest/download`;
const DL_URLS={mac:`${DL_BASE}/Outdoors.dmg`,win:`${DL_BASE}/Outdoors-Setup.exe`,linux:`https://github.com/${REPO}/releases/latest`} as const;
type OS="mac"|"win"|"linux";
function detectOS():OS{if(typeof navigator==="undefined")return"win";const ua=navigator.userAgent;if(/Mac|iPhone|iPad/.test(ua))return"mac";if(/Linux/.test(ua))return"linux";return"win";}
const OS_LABELS:Record<OS,string>={mac:"macOS",win:"Windows",linux:"Linux"};

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

function mulberry32(a:number){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const COUNTER_EPOCH=1774396800000;
const COUNTER_BASE=860;
const COUNTER_SEED=314159;
function getCounterStep(cursor:number,seed:number){
  const rng=mulberry32(seed);const r=rng();
  const hour=Math.floor(((COUNTER_EPOCH+cursor)%(86400000))/3600000);
  let minGap:number,maxGap:number;
  if(hour<6){minGap=10*60000;maxGap=18*60000}
  else if(hour>=13&&hour<23){minGap=4*60000;maxGap=7*60000}
  else{minGap=6*60000;maxGap=9*60000}
  return{gap:Math.floor(minGap+r*(maxGap-minGap)),nextSeed:(seed*16807+1)>>>0};
}
function getTaskCount():number{
  const elapsed=Math.max(0,Date.now()-COUNTER_EPOCH);
  let count=COUNTER_BASE,cursor=0,seed=COUNTER_SEED;
  while(cursor<elapsed){const step=getCounterStep(cursor,seed);seed=step.nextSeed;cursor+=step.gap;if(cursor>elapsed)break;count+=1}
  return count;
}
function getNextTickMs():number{
  const elapsed=Math.max(0,Date.now()-COUNTER_EPOCH);
  let cursor=0,seed=COUNTER_SEED;
  while(true){const step=getCounterStep(cursor,seed);seed=step.nextSeed;cursor+=step.gap;if(cursor>elapsed)return Math.max(1000,cursor-elapsed)}
}

export default function Home(){
  const[taskCount,setTaskCount]=useState(0);
  const[bump,setBump]=useState(false);
  const[os,setOs]=useState<OS>("win");
  const busyWords=["busy work.","emails.","applications.","meetings.","small talk.","spreadsheets.","scheduling.","follow-ups.","Canvas quizzes.","group projects.","cover letters.","data entry."];
  const[busyIdx,setBusyIdx]=useState(0);
  const[busyPaused,setBusyPaused]=useState(false);
  const[showDl,setShowDl]=useState(false);
  const txtPhrases=["Text us","Text Outdoors","Don't text your ex"];
  const[txtIdx,setTxtIdx]=useState(0);
  const natureImgs=["/images/20251004_144654.webp","/images/20251015_205903.webp","/images/20251122_213844.webp","/images/20251127_083555.webp","/images/20251230_080722.webp","/images/xp-bliss.jpg"];
  const[natureIdx,setNatureIdx]=useState(0);

  // Counter
  useEffect(()=>{
    setTaskCount(getTaskCount());
    let tid:ReturnType<typeof setTimeout>;
    const tick=()=>{setTaskCount(prev=>{const next=getTaskCount();if(next>prev)setBump(true);return next});tid=setTimeout(tick,getNextTickMs())};
    tid=setTimeout(tick,getNextTickMs());
    return()=>clearTimeout(tid);
  },[]);
  useEffect(()=>{if(bump){const t=setTimeout(()=>setBump(false),350);return()=>clearTimeout(t)}},[bump]);

  // Busy word rotation
  useEffect(()=>{
    if(busyPaused)return;
    const id=setInterval(()=>setBusyIdx(p=>(p+1)%busyWords.length),500);
    return()=>clearInterval(id);
  },[busyPaused,busyWords.length]);

  // Text button phrase rotation
  useEffect(()=>{
    const id=setInterval(()=>setTxtIdx(p=>(p+1)%txtPhrases.length),2000);
    return()=>clearInterval(id);
  },[txtPhrases.length]);

  // Nature image rotation
  useEffect(()=>{
    const id=setInterval(()=>setNatureIdx(p=>(p+1)%natureImgs.length),2000);
    return()=>clearInterval(id);
  },[natureImgs.length]);

  useEffect(()=>{
    if(!showDl)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setShowDl(false)};
    window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);
  },[showDl]);
  useEffect(()=>{setOs(detectOS())},[]);
  useEffect(()=>{document.title="Outdoors"},[]);

  // Nav scroll state
  useEffect(()=>{
    const f=()=>document.getElementById("nav")?.classList.toggle("scrolled",window.scrollY>40);
    window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);
  },[]);

  // Scroll reveal
  useEffect(()=>{
    const obs=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add("show")}),{threshold:0,rootMargin:"0px 0px -60px 0px"});
    document.querySelectorAll(".rv").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  // iMessage chat animation
  useEffect(()=>{const t=setTimeout(()=>{const ms=document.getElementById("waChat");if(!ms)return;const bs=ms.querySelectorAll(".m");if(bs[0]?.classList.contains("v"))return;bs.forEach((b,i)=>{setTimeout(()=>{b.classList.add("v");ms.scrollTop=ms.scrollHeight},i*400)})},600);return()=>clearTimeout(t)},[]);

  // Nav progress bar
  useEffect(()=>{
    const bar=document.getElementById("nav-progress");
    if(!bar)return;
    const onScroll=()=>{const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);bar.style.width=`${Math.min(100,pct*100)}%`};
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  // Tool marquee
  useEffect(()=>{
    const track=document.querySelector(".tool-track") as HTMLElement|null;
    const firstSet=document.querySelector(".tool-set") as HTMLElement|null;
    if(!track||!firstSet)return;
    const w=firstSet.offsetWidth;
    const style=document.createElement("style");
    style.textContent=`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-${w}px)}}`;
    document.head.appendChild(style);
    track.style.animation="marquee 30s linear infinite";
    return()=>{style.remove()};
  },[]);

  const headline="Get off Fizz and get Outdoors.";
  const words=headline.split(" ");

  const steps=[
    {l:"Text It",d:"\"Tell me what assignments are due\""},
    {l:"It takes over",d:"It uses your computer while you're away."},
    {l:"Done",d:"Finished before your next class starts."},
    {l:"Get Outdoors",d:"",img:true},
  ];
  const caps=[
    {lbl:"Email",t:"Email your prof you're sick. From bed. Convincingly.",icon:"/logos/gmail.svg"},
    {lbl:"Calendar",t:"Create, invite, make recurring, add Meet links...",icon:"/logos/gcal.svg"},
    {lbl:"Canvas",t:"Check due dates, submit work, reply to discussions while you nap.",icon:"/logos/rice.svg"},
    {lbl:"Sheets",t:"Track 47 internship apps without opening a single tab.",icon:"/logos/gsheets.svg"},
    {lbl:"Messaging",t:"Follow-ups on autopilot",icon:"/logos/slack.svg"},
    {lbl:"Drive",t:"Find that one file from COMP 140 in 3 seconds flat.",icon:"/logos/gdrive.svg"},
    {lbl:"Docs",t:"Turn your 2am brain dump into something a TA would grade well.",icon:"/logos/gdocs.svg"},
  ];

  const toolsX4=[...tools,...tools,...tools,...tools];

  return(<><style dangerouslySetInnerHTML={{__html:css}}/>
  <nav id="nav"><a href="#" className="logo" style={{display:"flex",alignItems:"center",gap:"8px"}}><img src="/logo-outdoors.svg" alt="Outdoors" style={{height:"28px",width:"auto"}}/><span>Outdoors.rice</span></a><button className="btn-primary" onClick={()=>setShowDl(true)}>Download</button><div id="nav-progress"/></nav>

  <div className="counter-bar">{taskCount>0&&<><span className={`counter-num${bump?" counter-bump":""}`}>{taskCount.toLocaleString()}</span> tasks completed · free for Rice students</>}</div>

  <section className="hero">
    <h1>{words.map((w,i)=><span key={i} className="hero-word" style={{animationDelay:`${i*60}ms`,marginRight:i<words.length-1?".3em":0}}>{w}</span>)}</h1>
    <ul className="hero-benefits">
      <li>Apply to 20 internships and create a Google Sheets to track progress</li>
      <li>I{"'"}m gonna sleep, can you check my Canvas assignments for this week and send me a wake up email with to-dos</li>
      <li>Tell me what{"'"}s the best servery food today</li>
    </ul>
    <div className="hero-ctas"><a href="sms:8032920205" className="btn-phone">{txtPhrases[txtIdx]}: (803) 292-0205</a><a href="#steps" className="btn-text">How it works</a></div>
  </section>

  <div className="phone-wrap"><div className="iphone"><div className="iphone-screen"><div className="di"/><div className="ios-bar"><div className="ios-time">9:15</div><div className="ios-icons"><div className="ios-sig"><span/><span/><span/><span/></div><div className="ios-bt"><div className="ios-bt-b"><div className="ios-bt-f"/></div><div className="ios-bt-t"/></div></div></div><div className="msg-hdr"><span className="msg-back">&lsaquo;</span><div className="msg-av">O</div><div className="msg-name">Outdoors</div></div><div className="msgs" id="waChat"><div className="mt">Today 9:14 AM</div><div className="m o">Email the team I{"'"}ll be 15 min late. Keep it casual.</div><div className="md">Delivered</div><div className="m i">Done. Sent from your Gmail: {"\u201c"}Running ~15 min behind. Start without me.{"\u201d"}</div><div className="m o">Compile all my performative pictures into a file and use them to create a Hinge account.</div><div className="mt">Read 9:14 AM</div><div className="m i">Done. Photos are organized and a Hinge profile draft is ready for review.</div><div className="m o">Build me a landing page.</div><div className="mt">Read 9:15 AM</div><div className="m i">You{"'"}re looking at it.</div></div><div className="msg-in"><div className="msg-field">Message</div><div className="msg-send">+</div></div><div className="ios-home-i"><div className="ios-home-bar"/></div></div></div></div>

  <div className="tool-strip"><div className="tool-track"><div className="tool-set">{toolsX4.map((t,i)=><img key={`a-${i}`} className="tool-icon" src={t.src} alt={t.name} title={t.name}/>)}</div><div className="tool-set">{toolsX4.map((t,i)=><img key={`b-${i}`} className="tool-icon" src={t.src} alt={t.name} title={t.name}/>)}</div></div></div>

  <div className="proof rv"><div className="proof-inner"><img className="proof-logo" src="/logos/rice.svg" alt="Rice University"/></div></div>

  <section className="manifesto rv"><div className="manifesto-glass"><p>You didn{"'"}t come to Rice to do <span className="busy-rotate" onMouseEnter={()=>setBusyPaused(true)} onMouseLeave={()=>setBusyPaused(false)}><span className="busy-word" key={busyIdx}>{busyWords[busyIdx]}</span></span></p></div></section>

  <section className="steps" id="steps"><div className="steps-inner"><div className="sec-hd rv"><div className="lbl">How it works</div><h2>You shouldn{"'"}t have to do work a machine can do.</h2></div><div className="steps-row">{steps.map((s,i)=><div key={s.l} className={`si rv${(s as any).img?" si-img":""}`} style={{transitionDelay:`${i*80}ms`,...((s as any).img?{backgroundImage:"url(/images/xp-bliss.jpg)",backgroundSize:"cover",backgroundPosition:"center"}:{})}}><div className="si-n">0{i+1}</div><div className="si-t">{s.l}</div>{s.d&&<p className="si-d">{s.d}</p>}</div>)}</div></div></section>

  <section className="caps"><div className="caps-inner"><div className="sec-hd rv"><div className="lbl">What it does</div><h2>You can automate it all, including emailing a clean email to your prof from your bed that you are indeed: sick</h2></div><div className="caps-grid">{caps.map((c,i)=><div key={c.lbl} className="cap rv" style={{transitionDelay:`${i*60}ms`}}><img className="cap-icon" src={c.icon} alt={c.lbl}/><div className="cap-title">{c.t}</div></div>)}</div></div></section>

  {/* Preload nature images */}
  <div style={{display:"none"}}>{natureImgs.map(src=><img key={src} src={src} alt=""/>)}</div>
  <section className="cta-final rv" id="download"><h2>Stop wasting time, get <span className="nature-word"><img key={natureIdx} className="nature-img" src={natureImgs[natureIdx]} alt="outdoors"/></span></h2><p>Free. No account needed.</p><p className="limits"><strong>30 tasks/day</strong> free for every Rice student. Refer a friend: <strong>+10 more</strong>.</p><div style={{marginTop:"4px"}}><button className="btn-primary" style={{padding:"14px 36px",fontSize:".95rem"}} onClick={()=>setShowDl(true)}>Download</button></div><div style={{marginTop:"32px"}}><a href="sms:8032920205" className="phone-big">(803) 292-0205</a><p className="phone-hint">Questions? Text us · that{"'"}s a real person.</p></div></section>

  {showDl&&<div className="dl-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowDl(false)}}>
    <div className="dl-modal">
      <h3>Download Outdoors</h3>
      <p>Choose your platform</p>
      <div className="dl-options">
        <a href={DL_URLS.win} className={`dl-opt${os==="win"?" active":""}`}><span className="dl-opt-icon">{"\uD83E\uDE9F"}</span><div className="dl-opt-info"><div className="dl-opt-name">Windows</div><div className="dl-opt-note">Download .exe installer</div></div></a>
        <a href={DL_URLS.mac} className={`dl-opt${os==="mac"?" active":""}`}><span className="dl-opt-icon">{"\uD83C\uDF4E"}</span><div className="dl-opt-info"><div className="dl-opt-name">macOS</div><div className="dl-opt-note">Download .dmg · read the README to install</div></div></a>
        <a href={DL_URLS.linux} className={`dl-opt${os==="linux"?" active":""}`}><span className="dl-opt-icon">{"\uD83D\uDDA5\uFE0F"}</span><div className="dl-opt-info"><div className="dl-opt-name">Linux</div><div className="dl-opt-note">Download latest .AppImage or .deb</div></div></a>
      </div>
      <button className="dl-close" onClick={()=>setShowDl(false)}>Close</button>
    </div>
  </div>}
  <footer><div className="fi"><span className="logo" style={{fontSize:"1.1rem"}}>outdoors</span><ul className="fl"><li><a href="#steps">Product</a></li><li><a href="#download">Download</a></li></ul><span className="fn">Built at Rice University</span></div></footer>
  </>)
}
