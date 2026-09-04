
(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const cfg=window.HAOCHIA_GUIDE_CONFIG||{};
  const video=$('#guideVideo'), launcher=$('.guide-launch'), panel=$('.guide-player'), sourceVideos=[...document.querySelectorAll('.guide-source-video')];
  const title=$('#guideTitle'), play=$('.guide-play'), followBtn=$('.guide-follow'), restart=$('.guide-restart'), loopBtn=$('.guide-loop'), close=$('.guide-close');
  const progress=$('.guide-progress'), fill=$('.guide-progress i');
  if(!video||!launcher||!panel)return;
  const cues=cfg.cues||[];
  let open=false, active=-1, follow=true, loop=false, programmaticUntil=0, raf=0, scrollTarget=null, sourceStates=[];

  const maxScroll=()=>Math.max(0,document.documentElement.scrollHeight-innerHeight);
  function groupBounds(selectors){
    let top=Infinity,bottom=-Infinity,found=false;
    (selectors||[]).forEach(s=>{const el=$(s);if(!el)return;const r=el.getBoundingClientRect();top=Math.min(top,scrollY+r.top);bottom=Math.max(bottom,scrollY+r.bottom);found=true;});
    return found?{top,bottom}:null;
  }
  function targetY(cue){
    if(cue.target==='hero')return 0;
    const group=cfg.groups&&cfg.groups[cue.target];
    if(group){
      const b=groupBounds(group);
      if(b){
        const center=(b.top+b.bottom)/2;
        const offset=(cfg.readingOffsets&&cfg.readingOffsets[cue.target])||0;
        return Math.max(0,Math.min(center-innerHeight/2+offset,maxScroll()));
      }
    }
    const sel=cfg.targets&&cfg.targets[cue.target], el=sel?$(sel):null;
    if(!el)return scrollY;
    const docTop=scrollY+el.getBoundingClientRect().top;
    let land=Number.isFinite(cue.land)?cue.land:(cfg.defaultLand||.16);
    if(cue.target==='cycle'&&Math.max(document.documentElement.clientWidth||0,innerWidth||0)<768)land=.12;
    return Math.max(0,Math.min(docTop-innerHeight*land,maxScroll()));
  }
  function scrollToGuide(y,duration){
    y=Math.round(y);
    if(raf&&scrollTarget!==null&&Math.abs(scrollTarget-y)<2)return;
    if(raf)cancelAnimationFrame(raf);
    const start=scrollY, delta=y-start;
    if(Math.abs(delta)<2){scrollTo(0,y);raf=0;scrollTarget=null;return;}
    duration=Number.isFinite(duration)?duration:Math.max(520,Math.min(820,520+Math.abs(delta)*.12));
    const t0=performance.now(); scrollTarget=y; programmaticUntil=t0+duration+160;
    const ease=t=>t*t;
    const frame=now=>{const t=Math.min(1,(now-t0)/duration);scrollTo(0,start+delta*ease(t));if(t<1)raf=requestAnimationFrame(frame);else{scrollTo(0,y);raf=0;scrollTarget=null;}};
    raf=requestAnimationFrame(frame);
  }
  function cueIndex(t){let idx=0;for(let i=0;i<cues.length;i++)if(t>=cues[i].t)idx=i;return idx;}
  function showFollow(show){if(!followBtn)return;followBtn.hidden=!show;followBtn.classList.toggle('is-visible',show);}
  function land(cue){scrollToGuide(targetY(cue));}
  function sync({force=false,seek=false}={}){
    if(!open)return; const t=video.currentTime||0, idx=cueIndex(t), cue=cues[idx]; if(!cue)return;
    if(idx!==active||force){active=idx;if(title)title.textContent=cue.title||'';land(cue);}else if(seek&&follow)land(cue);
    if(fill)fill.style.width=((t/(video.duration||92))*100)+'%'; if(play)play.textContent=video.paused?'繼續':'暫停';
  }
  function resume(){follow=true;showFollow(false);const cue=cues[cueIndex(video.currentTime||0)];if(cue)land(cue);}
  function userScroll(){if(!open||performance.now()<programmaticUntil)return;follow=false;showFollow(true);}

  function pauseSourceVideos(){
    sourceStates=sourceVideos.map(v=>({video:v,wasPlaying:!v.paused}));
    sourceVideos.forEach(v=>v.pause());
  }
  function restoreSourceVideos(){
    sourceStates.forEach(state=>{if(state.wasPlaying)state.video.play().catch(()=>{});});
    sourceStates=[];
  }
  function syncMobileBodyHeight(duration=0){
    const vw=Math.max(document.documentElement.clientWidth||0,innerWidth||0);
    if(vw>=768)return;
    const page=document.querySelector('.page');
    if(!page)return;
    const started=performance.now();
    const frame=()=>{
      const width=Math.max(document.documentElement.clientWidth||0,innerWidth||0);
      const scale=Math.min(1,width/430);
      document.body.style.height=Math.ceil(page.offsetHeight*scale)+'px';
      if(performance.now()-started<duration)requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function openGuide(){
    open=true;follow=true;active=-1;showFollow(false);
    pauseSourceVideos();
    document.body.classList.add('guide-active');
    syncMobileBodyHeight(560);
    panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');launcher.style.opacity='0';launcher.style.pointerEvents='none';video.currentTime=0;video.muted=false;video.volume=1;sync({force:true});video.play().then(()=>sync({force:true})).catch(()=>{if(play)play.textContent='播放';});
  }
  function closeGuide(){
    open=false;follow=true;active=-1;video.pause();
    document.body.classList.remove('guide-active');
    syncMobileBodyHeight(560);
    restoreSourceVideos();
    panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');launcher.style.opacity='1';launcher.style.pointerEvents='auto';showFollow(false);
  }
  launcher.addEventListener('click',openGuide);close?.addEventListener('click',closeGuide);
  play?.addEventListener('click',()=>{if(video.paused){resume();video.play().catch(()=>{});}else video.pause();setTimeout(()=>sync({seek:true}),40);});
  followBtn?.addEventListener('click',resume);
  restart?.addEventListener('click',()=>{follow=true;showFollow(false);video.currentTime=0;active=-1;sync({force:true});video.play().catch(()=>{});});
  loopBtn?.addEventListener('click',()=>{loop=!loop;loopBtn.setAttribute('aria-pressed',String(loop));loopBtn.classList.toggle('is-active',loop);});
  video.addEventListener('timeupdate',()=>sync()); video.addEventListener('seeking',()=>sync({force:true,seek:true})); video.addEventListener('play',()=>sync({seek:true})); video.addEventListener('pause',()=>sync());
  video.addEventListener('ended',()=>{if(loop){follow=true;showFollow(false);active=-1;const firstCue=cues[0];scrollToGuide(firstCue?targetY(firstCue):0,900);setTimeout(()=>{if(!open)return;video.currentTime=0;sync({force:true});video.play().catch(()=>{});},920);}else{if(title)title.textContent='導讀完成';if(play)play.textContent='重新播放';}});
  function seek(e){if(!Number.isFinite(video.duration)||video.duration<=0)return;const r=progress.getBoundingClientRect();const ratio=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));video.currentTime=ratio*video.duration;active=-1;sync({force:true,seek:true});}
  progress?.addEventListener('pointerdown',e=>{progress.setPointerCapture?.(e.pointerId);seek(e)});progress?.addEventListener('pointermove',e=>{if(e.buttons)seek(e)});progress?.addEventListener('click',seek);
  addEventListener('wheel',userScroll,{passive:true});addEventListener('touchmove',userScroll,{passive:true});addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key))userScroll();});
})();

/* v46.8 — mobile P4 AOS assist under the 430px master zoom. */
(()=>{
  if(!window.matchMedia||!matchMedia('(max-width: 767px)').matches)return;
  const setup=()=>{
    const links=[...document.querySelectorAll('.doGood-links [data-aos]')];
    const contact=document.querySelector('.sec4-contact[data-aos]');
    const nodes=contact?[...links,contact]:links;
    if(!nodes.length)return;
    let tries=0;
    const waitForAos=()=>{
      if(nodes.some(el=>!el.classList.contains('aos-init'))&&tries++<80){setTimeout(waitForAos,100);return;}
      if(!('IntersectionObserver' in window)){nodes.forEach(el=>el.classList.add('aos-animate'));return;}
      const linkObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('aos-animate');linkObserver.unobserve(entry.target);}});
      },{threshold:0,rootMargin:'0px 0px 18% 0px'});
      links.forEach(el=>linkObserver.observe(el));
      if(contact){
        const contactObserver=new IntersectionObserver(entries=>{
          entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('aos-animate');contactObserver.unobserve(entry.target);}});
        },{threshold:0,rootMargin:'0px 0px 10% 0px'});
        contactObserver.observe(contact);
      }
    };
    waitForAos();
  };
  if(document.readyState==='complete')setup();
  else window.addEventListener('load',setup,{once:true});
})();
