'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reduced.matches;
const planets = [
 ['mercury','Меркурий','Мир крайностей.','Ближайшая к Солнцу планета почти лишена атмосферы. Её поверхность покрыта кратерами, а день и ночь резко отличаются по температуре.','4 879 км','88 суток','#b5aaa1'],
 ['venus','Венера','Красота под облаками.','Плотная атмосфера удерживает тепло и делает Венеру самой горячей планетой Солнечной системы. Её облака скрывают каменистую поверхность.','12 104 км','225 суток','#f2bf83'],
 ['earth','Земля','Наш единственный дом.','Океаны, атмосфера и подходящая температура делают Землю уникальной. Это единственная известная нам планета, на которой существует жизнь.','12 742 км','365 суток','#91bdff'],
 ['mars','Марс','Следующий горизонт.','Красный цвет Марса связан с оксидами железа. Здесь есть огромные вулканы, каньоны и следы древних водоёмов.','6 779 км','687 суток','#ef9e7a'],
 ['jupiter','Юпитер','Гигант среди миров.','Самая большая планета Солнечной системы. Её атмосфера состоит преимущественно из водорода и гелия, а Большое Красное Пятно — гигантский шторм.','139 820 км','11,9 года','#e5c3a4'],
 ['saturn','Сатурн','Искусство гравитации.','Сатурн знаменит системой колец из частиц льда и камня. Это газовый гигант, окружённый множеством спутников.','116 460 км','29,4 года','#e9ca95'],
 ['uranus','Уран','Мир, лежащий на боку.','Ледяной гигант с необычным наклоном оси. Метан в атмосфере придаёт ему характерный голубовато-зелёный оттенок.','50 724 км','84 года','#a0d9e3'],
 ['neptune','Нептун','На краю солнечного света.','Самая далёкая из восьми планет. В холодной атмосфере этого ледяного гиганта бушуют невероятно быстрые ветры.','49 244 км','165 лет','#829dff']
];
const picker = $('#planet-picker'), story = $('#planet-story');
planets.forEach(([id,name,subtitle,description,diameter,year,color],i)=>{

 const btn=document.createElement('button');btn.type='button';btn.dataset.planet=id;btn.setAttribute('aria-pressed',i===0?'true':'false');btn.innerHTML=`<img src="assets/images/${id}.webp" alt=""><span>${name}</span>`;btn.addEventListener('click',()=>document.getElementById(id).scrollIntoView({behavior:motionPaused?'instant':'smooth',block:'start'}));picker.append(btn);
 const article=document.createElement('article');article.id=id;article.className='planet-row';article.style.setProperty('--planet-color',color);article.innerHTML=`<div class="planet-copy reveal"><p class="eyebrow">${i<4?'Каменистая планета':i<6?'Газовый гигант':'Ледяной гигант'}</p><h3>${name}</h3><p class="subtitle">${subtitle}</p><p class="description">${description}</p><div class="planet-stats"><div><b>${diameter}</b><span>средний диаметр</span></div><div><b>${year}</b><span>год на планете</span></div></div></div><div class="planet-art reveal"><div class="model-view planet-view" data-model="${id}"><img class="model-poster" src="assets/images/${id}.webp" alt="${name}" loading="lazy"><canvas tabindex="0" aria-label="3D-модель: ${name}"></canvas></div><span class="planet-drag">↔ Вращайте модель</span><div class="planet-tools"><button class="icon-button" data-action="in" aria-label="Приблизить ${name}">+</button><button class="icon-button" data-action="out" aria-label="Отдалить ${name}">−</button><button class="icon-button" data-action="reset" aria-label="Сбросить положение">↺</button></div></div>`;story.append(article);
});
// Count statistics once, when their section first enters the viewport.
const runningCounters = new Set();
const counterDuration = 1100;
function createCounter(element) {
  const node = [...element.childNodes].find(n => n.nodeType === Node.TEXT_NODE && /\d/.test(n.nodeValue));
  if (!node) return null;
  const original = node.nodeValue;
  const match = original.match(/^(\s*~?\s*)(\d+(?:[ \u00a0\u202f]\d{3})*(?:,\d+)?)([\s\S]*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const target = Number(number.replace(/[ \u00a0\u202f]/g, '').replace(',', '.'));
  if (!Number.isFinite(target)) return null;
  const decimals = number.includes(',') ? number.split(',')[1].length : 0;
  const formatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: /[ \u00a0\u202f]/.test(number)
  });
  element.style.fontVariantNumeric = 'tabular-nums';
  return {node, original, prefix, suffix, target, formatter, started: 0};
}
function updateCounters(now) {
  for (const counter of runningCounters) {
    const progress = motionPaused || reduced.matches ? 1 : Math.min(1, Math.max(0, (now-counter.started)/counterDuration));
    if (progress >= 1) {
      counter.node.nodeValue = counter.original;
      runningCounters.delete(counter);
    } else {
      const eased = 1 - Math.pow(1-progress, 3);
      counter.node.nodeValue = counter.prefix + counter.formatter.format(counter.target*eased) + counter.suffix;
    }
  }
}
if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < .25) continue;
      counterObserver.unobserve(entry.target);
      if (motionPaused || reduced.matches) continue;
      const started = performance.now();
      entry.target.querySelectorAll('strong, b').forEach(element => {
        const counter = createCounter(element);
        if (!counter) return;
        counter.started = started;
        counter.node.nodeValue = counter.prefix + counter.formatter.format(0) + counter.suffix;
        runningCounters.add(counter);
      });
    }
  }, {threshold: .25});
  $$('.metrics, .planet-stats, .sun-data').forEach(group => counterObserver.observe(group));
}

// Reveal content only after JS is available; the layout remains readable without motion.
document.documentElement.classList.add('js');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}),{threshold:.12});$$('.reveal').forEach(el=>revealObserver.observe(el));
const menu=$('.menu');menu.addEventListener('click',()=>{let open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');$('#navigation').classList.toggle('open',open);});$$('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');$('#navigation').classList.remove('open');}));
// One shared highlight slides between navigation links.
const navigation = $('#navigation');
const navIndicator = document.createElement('span');
navIndicator.className = 'nav-indicator';
navIndicator.setAttribute('aria-hidden', 'true');
navigation.prepend(navIndicator);
function updateNavIndicator() {
  const active = navigation.querySelector('a.active');
  if (!active) return;
  navIndicator.style.width = `${active.offsetWidth}px`;
  navIndicator.style.height = `${active.offsetHeight}px`;
  navIndicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  if (!navigation.classList.contains('has-indicator')) {
    navigation.classList.add('has-indicator');
    requestAnimationFrame(() => requestAnimationFrame(() => navigation.classList.add('indicator-animate')));
  }
}
let scrollDirty=true,activePlanet='';const rows=$$('.planet-row');const sections=['home','planets','stars-section','gallery'].map(id=>document.getElementById(id));
window.addEventListener('scroll',()=>scrollDirty=true,{passive:true});window.addEventListener('resize',()=>scrollDirty=true);
function scrollUpdate(){const h=innerHeight;const max=document.documentElement.scrollHeight-h;$('.reading-progress').style.width=`${max>0?scrollY/max*100:0}%`;let current=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<h*.5)current=s;});$$('#navigation a').forEach(a=>a.classList.toggle('active',a.hash==='#'+current.id));updateNavIndicator();let best=rows[0],dist=Infinity;rows.forEach(row=>{const r=row.getBoundingClientRect();const d=Math.abs(r.top+r.height*.5-h*.5);if(d<dist){dist=d;best=row;}if(r.bottom>0&&r.top<h){row.querySelector('.planet-view').style.setProperty('--drift',motionPaused?'0px':`${Math.max(-22,Math.min(22,(r.top+r.height/2-h/2)*.055))}px`);}});if(best.id!==activePlanet){activePlanet=best.id;$$('#planet-picker button').forEach(b=>{let active=b.dataset.planet===activePlanet;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));if(active&&picker.scrollWidth>picker.clientWidth){picker.scrollTo({left:b.offsetLeft-picker.clientWidth/2+b.offsetWidth/2,behavior:motionPaused?'instant':'smooth'});}});}}
// Local, animated star field. Rendering stops on pause and when tab is hidden.
const starCanvas=$('#stars'),ctx=starCanvas.getContext('2d');let starList=[],sw=0,sh=0;
function starResize(){const ratio=Math.min(devicePixelRatio||1,1.6);sw=innerWidth;sh=innerHeight;starCanvas.width=sw*ratio;starCanvas.height=sh*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);let seed=327;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};starList=Array.from({length:Math.min(580,Math.floor(sw*sh/3000)+100)},()=>({x:rand()*sw,y:rand()*sh,r:rand()<.07?1.5:.35+rand()*.7,a:.16+rand()*.55,p:rand()*6.28,s:.3+rand()*.6}));drawStars(0);}
function drawStars(t){ctx.clearRect(0,0,sw,sh);for(const s of starList){let y=(s.y-scrollY*s.s*.022)%sh;if(y<0)y+=sh;ctx.globalAlpha=Math.max(.08,s.a*(.8+.2*Math.sin(t*.001*s.s+s.p)));ctx.fillStyle=s.r>1.2?'#acc8ff':'#dce7ff';ctx.beginPath();ctx.arc(s.x,y,s.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
starResize();window.addEventListener('resize',starResize);
// Gallery: autonomous playback, actual pause, progress indicator, manual navigation and swipe.
const track=$('#gallery-track'),cards=$$('.gallery-card'),dots=$('#gallery-dots');let slide=0,elapsed=0,galleryPaused=reduced.matches,galleryVisible=false;const duration=6500;
const dotButtons=cards.map((_,i)=>{let b=document.createElement('button');b.className='dot';b.type='button';b.setAttribute('aria-label',`Слайд ${i+1}`);b.addEventListener('click',()=>showSlide(i));dots.append(b);return b;});
function positionGallery(){track.style.transform=`translateX(-${slide*(cards[0].getBoundingClientRect().width+18)}px)`;}
function showSlide(i){slide=(i+cards.length)%cards.length;elapsed=0;positionGallery();$('#gallery-count').textContent=`${slide+1} из ${cards.length}`;dotButtons.forEach((b,j)=>{b.classList.toggle('active',slide===j);b.style.setProperty('--progress','0');b.setAttribute('aria-pressed',String(slide===j));});cards.forEach((c,j)=>c.setAttribute('aria-hidden',String(j!==slide)));}
function updateGalleryButton(){const paused=galleryPaused||motionPaused;$('#gallery-pause').textContent=paused?'▶':'Ⅱ';$('#gallery-pause').setAttribute('aria-label',paused?'Продолжить галерею':'Приостановить галерею');}
$('#gallery-pause').addEventListener('click',()=>{if(motionPaused){setMotion(false);galleryPaused=false;}else galleryPaused=!galleryPaused;updateGalleryButton();});$('#prev').addEventListener('click',()=>showSlide(slide-1));$('#next').addEventListener('click',()=>showSlide(slide+1));window.addEventListener('resize',positionGallery);let swipeX=0;$('.gallery-viewport').addEventListener('touchstart',e=>swipeX=e.touches[0].clientX,{passive:true});$('.gallery-viewport').addEventListener('touchend',e=>{let delta=e.changedTouches[0].clientX-swipeX;if(Math.abs(delta)>45)showSlide(slide+(delta<0?1:-1));},{passive:true});new IntersectionObserver(([e])=>galleryVisible=e.isIntersecting,{threshold:.25}).observe($('.gallery-viewport'));showSlide(0);
function setMotion(paused){motionPaused=paused;document.documentElement.classList.toggle('paused',paused);const b=$('#motion');b.setAttribute('aria-label',paused?'Продолжить анимации':'Приостановить анимации');b.title=b.getAttribute('aria-label');b.innerHTML=paused?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 5v14M15 5v14"/></svg>';updateGalleryButton();scrollDirty=true;}
$('#motion').addEventListener('click',()=>setMotion(!motionPaused));reduced.addEventListener('change',e=>setMotion(e.matches));setMotion(motionPaused);
let last=performance.now(),starTick=0;
function frame(now){updateCounters(now);const dt=Math.min(50,now-last);last=now;if(scrollDirty){scrollUpdate();scrollDirty=false;if(motionPaused)drawStars(0);}if(!document.hidden){if(!motionPaused&&now-starTick>35){drawStars(now);starTick=now;}if(galleryVisible&&!galleryPaused&&!motionPaused){elapsed+=dt;if(elapsed>=duration)showSlide(slide+1);dotButtons[slide].style.setProperty('--progress',String(elapsed/duration));}}requestAnimationFrame(frame);}requestAnimationFrame(frame);
// Inertial mouse-wheel scrolling. Native touch and keyboard scrolling remain intact.
let wheelTarget=null,wheelFrame=0;function stopWheel(){if(wheelFrame)cancelAnimationFrame(wheelFrame);wheelFrame=0;wheelTarget=null;}
function smoothStep(){if(wheelTarget===null)return;const delta=wheelTarget-scrollY;if(Math.abs(delta)<1){window.scrollTo({top:wheelTarget,behavior:'instant'});stopWheel();return;}window.scrollTo({top:scrollY+delta*.16,behavior:'instant'});wheelFrame=requestAnimationFrame(smoothStep);}
window.addEventListener('wheel',e=>{if(motionPaused||e.ctrlKey||e.metaKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.deltaMode!==0||e.target.closest('.planet-picker'))return;e.preventDefault();wheelTarget=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,(wheelTarget??scrollY)+e.deltaY));if(!wheelFrame)wheelFrame=requestAnimationFrame(smoothStep);},{passive:false});['touchstart','pointerdown','keydown'].forEach(n=>window.addEventListener(n,stopWheel,{passive:true}));
