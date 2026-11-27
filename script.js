'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reduced.matches;
const translations = {
  "Beyond Earth — интерактивное путешествие по Вселенной.": "Beyond Earth — an interactive journey through the universe.",
  "Beyond Earth — Космос ближе, чем кажется": "Beyond Earth — Space is closer than you think",
  "К содержанию": "Skip to content",
  "Beyond Earth, главная": "Beyond Earth, home",
  "Главная навигация": "Main navigation",
  "Главная": "Home",
  "Планеты": "Planets",
  "Звёзды": "Stars",
  "Галерея": "Gallery",
  "Приостановить анимации": "Pause animations",
  "Продолжить анимации": "Resume animations",
  "Открыть меню": "Open menu",
  "Закрыть меню": "Close menu",
  "За пределами": "Beyond the",
  "известного": "known",
  "Космос ближе, чем кажется.": "Space is closer than you think.",
  "Космонавт в скафандре": "Astronaut in a spacesuit",
  "3D-модель космонавта, вращение стрелками или мышью": "3D astronaut model, rotate with arrow keys or mouse",
  "Интерактивная 3D-модель": "Interactive 3D model",
  "Приблизить": "Zoom in",
  "Отдалить": "Zoom out",
  "Сбросить": "Reset",
  "✧ Перетащите, чтобы вращать": "✧ Drag to rotate",
  "Начать путешествие": "Begin the journey",
  "ПРОКРУТИТЕ, ЧТОБЫ ИССЛЕДОВАТЬ": "SCROLL TO EXPLORE",
  "Наш адрес во Вселенной": "Our place in the universe",
  "В бесконечном пространстве": "In the vastness of space",
  "есть место,": "there is a place",
  "которое мы зовём домом": "we call home",
  "Восемь планет, одна звезда и миллиарды историй. Солнечная система — только первая глава нашего путешествия.": "Eight planets, one star and billions of stories. The Solar System is only the first chapter of our journey.",
  "планет": "planets",
  "4,6": "4.6",
  "млрд": "billion",
  "лет Солнечной системе": "years of the Solar System",
  "звезда в нашей системе": "star in our system",
  "Солнечная система": "Solar System",
  "Восемь миров": "Eight worlds",
  "Ни одного похожего": "No two alike",
  "Выберите планету или продолжайте прокручивать. Каждый мир — отдельная история.": "Select a planet or keep scrolling. Every world has its own story.",
  "Выбор планеты": "Choose a planet",
  "Жизнь звёзд": "The life of stars",
  "Даже свет": "Even light",
  "имеет историю": "has a story",
  "Звёзды рождаются, меняются и умирают. Их история длится миллионы и миллиарды лет.": "Stars are born, evolve and die. Their stories unfold over millions and billions of years.",
  "Солнце": "The Sun",
  "3D-модель Солнца": "3D model of the Sun",
  "Наша звезда": "Our star",
  "Гигантская сфера горячей плазмы. В её ядре водород превращается в гелий, высвобождая энергию, которая согревает Землю.": "A giant sphere of hot plasma. Hydrogen fuses into helium in its core, releasing the energy that warms Earth.",
  "~5 500 °C": "~5,500 °C",
  "температура поверхности": "surface temperature",
  "~8 мин": "~8 min",
  "путь света до Земли": "light travel time to Earth",
  "Рождение": "Birth",
  "Туманность": "Nebula",
  "Облака газа и пыли сжимаются под действием гравитации, образуя новые звёзды.": "Clouds of gas and dust collapse under gravity, forming new stars.",
  "Жизнь": "Life",
  "Свет": "Light",
  "В ядре звезды идут термоядерные реакции. Именно они питают её сияние.": "Nuclear fusion in a star's core powers its glow.",
  "Эволюция": "Evolution",
  "Новая глава": "A new chapter",
  "Судьба звезды зависит от массы: она может стать белым карликом, нейтронной звездой или чёрной дырой.": "A star's fate depends on its mass: it may become a white dwarf, a neutron star or a black hole.",
  "Вне привычного": "Beyond the familiar",
  "Красота,": "Beauty",
  "не знающая границ": "without limits",
  "Три взгляда на далёкую Вселенную. Художественные визуализации, вдохновлённые космосом.": "Three views of the distant universe. Artistic visualizations inspired by space.",
  "карусель": "carousel",
  "Космическая галерея": "Space gallery",
  "Колыбель звёзд": "Cradle of stars",
  "Туманности — облака вещества, из которого могут рождаться новые миры.": "Nebulae are clouds of matter from which new worlds can form.",
  "Острова света": "Islands of light",
  "Галактики объединяют звёзды, газ, пыль и тёмную материю под действием гравитации.": "Gravity binds stars, gas, dust and dark matter together into galaxies.",
  "Пыль бесконечности": "Dust of infinity",
  "Вещество, из которого состоят планеты и живые существа, связано с историей звёзд.": "The matter that makes up planets and living things is connected to the history of stars.",
  "Выбрать слайд": "Select a slide",
  "Приостановить галерею": "Pause gallery",
  "Продолжить галерею": "Resume gallery",
  "Предыдущий слайд": "Previous slide",
  "Следующий слайд": "Next slide",
  "Конец путешествия или его начало": "The end of a journey or its beginning",
  "Мы — часть": "We are part of",
  "чего-то большего": "something greater",
  "В следующий раз, когда посмотрите на небо, вспомните: каждый луч света рассказывает историю.": "Next time you look at the sky, remember that every ray of light tells a story.",
  "Вернуться к началу ↑": "Back to the beginning ↑",
  "Учебный интерактивный проект о космосе.": "An interactive educational project about space.",
  "Авторские 3D-модели и UHD-визуализации. Масштабы условные.": "Original 3D models and UHD illustrations. Not to scale.",
  "Наверх ↑": "Back to top ↑",
  "Каменистая планета": "Rocky planet",
  "Газовый гигант": "Gas giant",
  "Ледяной гигант": "Ice giant",
  "средний диаметр": "mean diameter",
  "год на планете": "orbital period",
  "↔ Вращайте модель": "↔ Rotate the model",
  "Сбросить положение": "Reset view",
  "Статичное изображение · WebGL недоступен": "Static image · WebGL unavailable",
  "3D-превью · WebGL недоступен": "3D preview · WebGL unavailable",
  "✧ Вращайте влево или вправо": "✧ Rotate left or right",
  "Deep space": "Deep space",
  "Galaxies": "Galaxies",
  "Stellar dust": "Stellar dust",
  "Меркурий": "Mercury",
  "Мир крайностей.": "A world of extremes.",
  "Ближайшая к Солнцу планета почти лишена атмосферы. Её поверхность покрыта кратерами, а день и ночь резко отличаются по температуре.": "The closest planet to the Sun has almost no atmosphere. Its cratered surface experiences dramatic temperature changes between day and night.",
  "4 879 км": "4,879 km",
  "88 суток": "88 days",
  "3D-модель: Меркурий": "3D model: Mercury",
  "Приблизить Меркурий": "Zoom in on Mercury",
  "Отдалить Меркурий": "Zoom out from Mercury",
  "Венера": "Venus",
  "Красота под облаками.": "Beauty beneath the clouds.",
  "Плотная атмосфера удерживает тепло и делает Венеру самой горячей планетой Солнечной системы. Её облака скрывают каменистую поверхность.": "A dense atmosphere traps heat, making Venus the hottest planet in the Solar System. Its clouds conceal a rocky surface.",
  "12 104 км": "12,104 km",
  "225 суток": "225 days",
  "3D-модель: Венера": "3D model: Venus",
  "Приблизить Венера": "Zoom in on Venus",
  "Отдалить Венера": "Zoom out from Venus",
  "Земля": "Earth",
  "Наш единственный дом.": "Our only home.",
  "Океаны, атмосфера и подходящая температура делают Землю уникальной. Это единственная известная нам планета, на которой существует жизнь.": "Oceans, an atmosphere and suitable temperatures make Earth unique. It is the only planet known to support life.",
  "12 742 км": "12,742 km",
  "365 суток": "365 days",
  "3D-модель: Земля": "3D model: Earth",
  "Приблизить Земля": "Zoom in on Earth",
  "Отдалить Земля": "Zoom out from Earth",
  "Марс": "Mars",
  "Следующий горизонт.": "The next horizon.",
  "Красный цвет Марса связан с оксидами железа. Здесь есть огромные вулканы, каньоны и следы древних водоёмов.": "Iron oxides give Mars its red color. It is home to enormous volcanoes, canyons and traces of ancient bodies of water.",
  "6 779 км": "6,779 km",
  "687 суток": "687 days",
  "3D-модель: Марс": "3D model: Mars",
  "Приблизить Марс": "Zoom in on Mars",
  "Отдалить Марс": "Zoom out from Mars",
  "Юпитер": "Jupiter",
  "Гигант среди миров.": "A giant among worlds.",
  "Самая большая планета Солнечной системы. Её атмосфера состоит преимущественно из водорода и гелия, а Большое Красное Пятно — гигантский шторм.": "The largest planet in the Solar System. Its atmosphere is mostly hydrogen and helium, and the Great Red Spot is a gigantic storm.",
  "139 820 км": "139,820 km",
  "11,9 года": "11.9 years",
  "3D-модель: Юпитер": "3D model: Jupiter",
  "Приблизить Юпитер": "Zoom in on Jupiter",
  "Отдалить Юпитер": "Zoom out from Jupiter",
  "Сатурн": "Saturn",
  "Искусство гравитации.": "The art of gravity.",
  "Сатурн знаменит системой колец из частиц льда и камня. Это газовый гигант, окружённый множеством спутников.": "Saturn is famous for its rings of ice and rock. This gas giant is surrounded by numerous moons.",
  "116 460 км": "116,460 km",
  "29,4 года": "29.4 years",
  "3D-модель: Сатурн": "3D model: Saturn",
  "Приблизить Сатурн": "Zoom in on Saturn",
  "Отдалить Сатурн": "Zoom out from Saturn",
  "Уран": "Uranus",
  "Мир, лежащий на боку.": "A world on its side.",
  "Ледяной гигант с необычным наклоном оси. Метан в атмосфере придаёт ему характерный голубовато-зелёный оттенок.": "An ice giant with an unusual axial tilt. Methane in its atmosphere gives it a distinctive blue-green color.",
  "50 724 км": "50,724 km",
  "84 года": "84 years",
  "3D-модель: Уран": "3D model: Uranus",
  "Приблизить Уран": "Zoom in on Uranus",
  "Отдалить Уран": "Zoom out from Uranus",
  "Нептун": "Neptune",
  "На краю солнечного света.": "At the edge of sunlight.",
  "Самая далёкая из восьми планет. В холодной атмосфере этого ледяного гиганта бушуют невероятно быстрые ветры.": "The farthest of the eight planets. Incredibly fast winds sweep through this ice giant's cold atmosphere.",
  "49 244 км": "49,244 km",
  "165 лет": "165 years",
  "3D-модель: Нептун": "3D model: Neptune",
  "Приблизить Нептун": "Zoom in on Neptune",
  "Отдалить Нептун": "Zoom out from Neptune",
  "Слайд 1": "Slide 1",
  "Слайд 2": "Slide 2",
  "Слайд 3": "Slide 3"
};
let language = 'ru';
function t(value) { return language === 'en' ? (translations[value] ?? value) : value; }
const localizedNodes = [];
function captureTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('script, style, #gallery-count, .drag-label, .planet-drag')) continue;
    const raw = node.nodeValue, key = raw.trim();
    if (Object.prototype.hasOwnProperty.call(translations,key)) {
      localizedNodes.push({node, ru:raw, en:raw.replace(key,translations[key])});
    }
  }
  document.querySelectorAll('[aria-label], [alt], [title], [aria-roledescription], meta[name="description"]').forEach(element => {
    for (const attr of ['aria-label','alt','title','aria-roledescription','content']) {
      const ru = element.getAttribute(attr);
      if (ru && Object.prototype.hasOwnProperty.call(translations,ru)) localizedNodes.push({element,attr,ru,en:translations[ru]});
    }
  });
  localizedNodes.push({element:document,attr:'title',ru:document.title,en:translations[document.title]});
}
function applyLanguage(next) {
  for (const counter of runningCounters) counter.node.nodeValue = counter.original;
  runningCounters.clear();
  language = next === 'en' ? 'en' : 'ru';
  document.documentElement.lang = language;
  for (const item of localizedNodes) {
    const value = item[language];
    if (item.node) item.node.nodeValue = value;
    else if (item.element === document) document.title = value;
    else item.element.setAttribute(item.attr,value);
  }
  const toggle = $('#language-switch');
  toggle.textContent = language === 'ru' ? 'EN' : 'RU';
  toggle.title = language === 'ru' ? 'Switch to English' : 'Переключить на русский';
  toggle.setAttribute('aria-label',toggle.title);
  menu.setAttribute('aria-label',t(menu.getAttribute('aria-expanded') === 'true' ? 'Закрыть меню' : 'Открыть меню'));
  const motion = $('#motion');
  motion.title = t(motionPaused ? 'Продолжить анимации' : 'Приостановить анимации');
  motion.setAttribute('aria-label',motion.title);
  updateGalleryButton();
  updateGalleryCount();
  const astroStatus = $('.astro-view').dataset.ready;
  $('.drag-label').textContent = t(astroStatus === 'fallback' ? '3D-превью · WebGL недоступен' : astroStatus === 'software' ? '✧ Вращайте влево или вправо' : '✧ Перетащите, чтобы вращать');
  $('.planet-art').forEach(art => {
    art.querySelector('.planet-drag').textContent = t(art.querySelector('.planet-view').dataset.ready === 'fallback' ? 'Статичное изображение · WebGL недоступен' : '↔ Вращайте модель');
  });
  try { localStorage.setItem('beyond-earth-language',language); } catch (_) {}
  scrollDirty = true;
  requestAnimationFrame(() => { updateNavIndicator(); positionGallery(); });
}

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
  const match = original.match(language === 'en' ? /^(\s*~?\s*)(\d+(?:,\d{3})*(?:\.\d+)?)([\s\S]*)$/ : /^(\s*~?\s*)(\d+(?:[ \u00a0\u202f]\d{3})*(?:,\d+)?)([\s\S]*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const target = Number(language === 'en' ? number.replace(/,/g,'') : number.replace(/[ \u00a0\u202f]/g,'').replace(',','.'));
  if (!Number.isFinite(target)) return null;
  const decimal = language === 'en' ? '.' : ',';
  const decimals = number.includes(decimal) ? number.split(decimal)[1].length : 0;
  const formatter = new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: language === 'en' ? number.includes(',') : /[ \u00a0\u202f]/.test(number)
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
const menu=$('.menu');menu.addEventListener('click',()=>{let open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',t(open?'Закрыть меню':'Открыть меню'));$('#navigation').classList.toggle('open',open);});$$('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('Открыть меню'));$('#navigation').classList.remove('open');}));
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
function updateGalleryCount(){ $('#gallery-count').textContent = language === 'en' ? `${slide+1} of ${cards.length}` : `${slide+1} из ${cards.length}`; }
function showSlide(i){slide=(i+cards.length)%cards.length;elapsed=0;positionGallery();updateGalleryCount();dotButtons.forEach((b,j)=>{b.classList.toggle('active',slide===j);b.style.setProperty('--progress','0');b.setAttribute('aria-pressed',String(slide===j));});cards.forEach((c,j)=>c.setAttribute('aria-hidden',String(j!==slide)));}
function updateGalleryButton(){const paused=galleryPaused||motionPaused;$('#gallery-pause').textContent=paused?'▶':'Ⅱ';$('#gallery-pause').setAttribute('aria-label',t(paused?'Продолжить галерею':'Приостановить галерею'));}
$('#gallery-pause').addEventListener('click',()=>{if(motionPaused){setMotion(false);galleryPaused=false;}else galleryPaused=!galleryPaused;updateGalleryButton();});$('#prev').addEventListener('click',()=>showSlide(slide-1));$('#next').addEventListener('click',()=>showSlide(slide+1));window.addEventListener('resize',positionGallery);let swipeX=0;$('.gallery-viewport').addEventListener('touchstart',e=>swipeX=e.touches[0].clientX,{passive:true});$('.gallery-viewport').addEventListener('touchend',e=>{let delta=e.changedTouches[0].clientX-swipeX;if(Math.abs(delta)>45)showSlide(slide+(delta<0?1:-1));},{passive:true});new IntersectionObserver(([e])=>galleryVisible=e.isIntersecting,{threshold:.25}).observe($('.gallery-viewport'));showSlide(0);
function setMotion(paused){motionPaused=paused;document.documentElement.classList.toggle('paused',paused);const b=$('#motion');b.setAttribute('aria-label',t(paused?'Продолжить анимации':'Приостановить анимации'));b.title=b.getAttribute('aria-label');b.innerHTML=paused?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 5v14M15 5v14"/></svg>';updateGalleryButton();scrollDirty=true;}
$('#motion').addEventListener('click',()=>setMotion(!motionPaused));reduced.addEventListener('change',e=>setMotion(e.matches));setMotion(motionPaused);
let last=performance.now(),starTick=0;
function frame(now){updateCounters(now);const dt=Math.min(50,now-last);last=now;if(scrollDirty){scrollUpdate();scrollDirty=false;if(motionPaused)drawStars(0);}if(!document.hidden){if(!motionPaused&&now-starTick>35){drawStars(now);starTick=now;}if(galleryVisible&&!galleryPaused&&!motionPaused){elapsed+=dt;if(elapsed>=duration)showSlide(slide+1);dotButtons[slide].style.setProperty('--progress',String(elapsed/duration));}}requestAnimationFrame(frame);}requestAnimationFrame(frame);
// Inertial mouse-wheel scrolling. Native touch and keyboard scrolling remain intact.
let wheelTarget=null,wheelFrame=0;function stopWheel(){if(wheelFrame)cancelAnimationFrame(wheelFrame);wheelFrame=0;wheelTarget=null;}
function smoothStep(){if(wheelTarget===null)return;const delta=wheelTarget-scrollY;if(Math.abs(delta)<1){window.scrollTo({top:wheelTarget,behavior:'instant'});stopWheel();return;}window.scrollTo({top:scrollY+delta*.16,behavior:'instant'});wheelFrame=requestAnimationFrame(smoothStep);}
window.addEventListener('wheel',e=>{if(motionPaused||e.ctrlKey||e.metaKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.deltaMode!==0||e.target.closest('.planet-picker'))return;e.preventDefault();wheelTarget=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,(wheelTarget??scrollY)+e.deltaY));if(!wheelFrame)wheelFrame=requestAnimationFrame(smoothStep);},{passive:false});['touchstart','pointerdown','keydown'].forEach(n=>window.addEventListener(n,stopWheel,{passive:true}));

// Preserve the chosen language without recreating models or resetting the scroll position.
captureTranslations();
let savedLanguage = 'ru';
try { savedLanguage = localStorage.getItem('beyond-earth-language') || 'ru'; } catch (_) {}
applyLanguage(savedLanguage);
$('#language-switch').addEventListener('click',()=>applyLanguage(language === 'ru' ? 'en' : 'ru'));
