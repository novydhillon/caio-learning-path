const progressKey = 'caio-learning-progress-v1';
const state = JSON.parse(localStorage.getItem(progressKey) || '{"completed":{},"homework":{},"quiz":{}}');
state.quizRevision ||= {};
const save = () => localStorage.setItem(progressKey, JSON.stringify(state));
const el = id => document.getElementById(id);
const dataRoot = 'course/';
let catalog, migration, requestNumber = 0;
const getJSON = async path => {
  const response = await fetch(dataRoot + path, {cache:'no-store'});
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
};
const allLessons = () => catalog.modules.flatMap(m => m.lessons);
const pct = () => Math.round(allLessons().filter(l => state.completed[l.id]).length / allLessons().length * 100);
const modulePct = m => Math.round(m.lessons.filter(l => state.completed[l.id]).length / m.lessons.length * 100);
function migrateProgress(ids){
  if(localStorage.getItem('caio-id-migration-v2')) return;
  for(const [oldId,newId] of Object.entries(ids.lessons)){
    if(state.completed[oldId] && state.completed[newId] === undefined) state.completed[newId] = true;
  }
  for(const [oldId,newId] of Object.entries(ids.modules)){
    if(state.homework[oldId] && state.homework[newId] === undefined) state.homework[newId] = true;
    if(state.quiz[oldId] !== undefined && state.quiz[newId] === undefined) state.quiz[newId] = state.quiz[oldId];
  }
  save(); localStorage.setItem('caio-id-migration-v2','done');
}
function navigate(type,id){
  const hash = '#' + type + (id ? '/' + id : '');
  if(location.hash !== hash) history.pushState(null,'',hash);
}
function setView(name){
  document.body.dataset.view=name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  el(name+'-view').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderNav(active){
  el('course-nav').innerHTML = `<button class="nav-btn" data-nav="dashboard" onclick="renderDashboard()">Dashboard</button>` +
    catalog.modules.map((m,i) => `<button class="nav-btn" data-nav="${m.id}" onclick="renderModule('${m.id}')">${String(i+1).padStart(2,'0')} · ${m.title}<span class="nav-meta">${modulePct(m)}%</span></button>`).join('') +
    `<button class="nav-btn" data-nav="references" onclick="renderReferences()">Reference library</button>`;
  document.querySelector(`[data-nav="${active}"]`)?.classList.add('active');
}
function updateOverall(){el('overall-progress-text').textContent = `${pct()}% complete`;}
function renderDashboard(updateHash=true){
  ++requestNumber;
  if(updateHash) navigate('dashboard');
  setView('dashboard'); el('page-title').textContent='Dashboard'; updateOverall();
  const done=allLessons().filter(l=>state.completed[l.id]).length;
  const homeworkDone=catalog.modules.filter(m=>state.homework[m.id]).length;
  const quizzesDone=catalog.modules.filter(m=>state.quiz[m.id]!==undefined && state.quizRevision[m.id]===m.quizVersion).length;
  const d=catalog.dashboard;
  el('dashboard-view').innerHTML=`
    <div class="hero"><div class="hero-copy"><p class="eyebrow">${d.eyebrow}</p><h3>${d.headline}</h3><p>${d.intro}</p><div class="progress-track"><div class="progress-fill" style="width:${pct()}%"></div></div></div></div>
    <div class="grid">
      <div class="card span-4"><p class="eyebrow">LESSONS</p><div class="stat">${done}/${allLessons().length}</div><p class="muted">Completed and always available for review.</p></div>
      <div class="card span-4"><p class="eyebrow">HOMEWORK</p><div class="stat">${homeworkDone}/${catalog.modules.length}</div><p class="muted">Executive artifacts and applied practice.</p></div>
      <div class="card span-4"><p class="eyebrow">QUIZZES</p><div class="stat">${quizzesDone}/${catalog.modules.length}</div><p class="muted">Retrieval practice after each module.</p></div>
      <div class="card span-8"><h3>Course sequence</h3><div class="module-list">${catalog.modules.map((m,i)=>`<div class="module-row" onclick="renderModule('${m.id}')"><div><small>Weeks ${m.weeks}</small><strong>${i+1}. ${m.title}</strong><small>${m.subtitle}</small></div><span class="badge ${modulePct(m)===100?'done':''}">${modulePct(m)}%</span></div>`).join('')}</div></div>
      <div class="card span-4"><h3>Learning design</h3><p class="muted">${d.learningDesign}</p><div class="callout">${d.learningRhythm}</div></div>
      <div class="card span-12"><h3>Career outcome</h3><p class="muted">${d.careerOutcome}</p></div>
    </div>`;
  renderNav('dashboard');
}
function moduleReferences(m){
  const links=[...m.lessons.flatMap(l=>l.resources),...m.regionalResources];
  return [...new Map(links.map(link=>[link[1],link])).values()];
}
function showLoadError(view,retry){
  el(view+'-view').innerHTML=`<div class="card"><h3>Couldn't load this part of the course</h3><p>Please check your connection and try again.</p><button class="primary" onclick="${retry}">Try again</button></div>`;
}
async function renderModule(id,updateHash=true){
  if(!catalog.modules.some(m=>m.id===id)) return renderDashboard();
  if(updateHash) navigate('module',id);
  const request=++requestNumber;
  setView('section'); el('page-title').textContent=catalog.modules.find(m=>m.id===id).title; updateOverall();
  renderNav(id); el('section-view').innerHTML='<p class="muted" role="status">Loading module…</p>';
  try{
    const m=await getJSON(`modules/${id}/module.json`);
    if(request!==requestNumber) return;
    const refs=moduleReferences(m);
    el('section-view').innerHTML=`
      <div class="section-head"><p class="eyebrow">WEEKS ${m.weeks} · MODULE ${catalog.modules.findIndex(x=>x.id===id)+1}</p><h3>${m.title}</h3><p>${m.summary}</p><div class="objectives">${m.objectives.map(x=>`<span class="objective">${x}</span>`).join('')}</div></div>
      <div class="card summary-box"><h4>Section summary</h4><p>${m.summary}</p><p class="muted">Use this as your review anchor after completing the section.</p></div>
      ${m.lessons.map((l,i)=>`<div class="card lesson"><div class="lesson-top"><div><p class="eyebrow">LESSON ${i+1} · ${l.duration}</p><h4>${l.title}</h4></div><span class="badge ${state.completed[l.id]?'done':''}">${state.completed[l.id]?'Completed':'Ready to read'}</span></div><p>${l.body}</p><button class="primary" onclick="openLesson('${l.id}')">Open lesson →</button><label class="checkline"><input type="checkbox" ${state.completed[l.id]?'checked':''} onchange="toggleLesson('${l.id}',this.checked)"> Mark lesson complete</label></div>`).join('')}
      <div class="card homework"><p class="eyebrow">APPLIED PRACTICE</p><h3>Homework</h3><p>${m.homework}</p><label class="checkline"><input type="checkbox" ${state.homework[m.id]?'checked':''} onchange="toggleHomework('${m.id}',this.checked)"> I completed this artifact</label></div>
      <div class="card"><p class="eyebrow">RETRIEVAL PRACTICE</p><h3>Module quiz</h3><form id="quiz-form">${m.quiz.map((q,qi)=>`<div class="quiz-q"><strong>${qi+1}. ${q.q}</strong>${q.options.map((o,oi)=>`<label class="option"><input type="radio" name="q${qi}" value="${oi}"> ${o}</label>`).join('')}</div>`).join('')}<button type="button" class="primary" onclick="gradeQuiz('${m.id}')">Submit quiz</button><div id="quiz-result" class="quiz-result">${state.quiz[m.id]===undefined?'':state.quizRevision[m.id]===m.quizVersion?`Last score: ${state.quiz[m.id]}%`:`Previous score: ${state.quiz[m.id]}% (earlier quiz)`}</div></form></div>
      <div class="card"><h3>Module references</h3>${refs.length?`<ul class="resources">${refs.map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[0]} ↗</a></li>`).join('')}</ul>`:'<p class="muted">No external references are listed for this module.</p>'}<p><a href="#references">View the full reference library →</a></p></div>
      <footer>${catalog.reviewSuggestion}</footer>`;
  }catch(error){if(request===requestNumber) showLoadError('section',`renderModule('${id}',false)`);console.error(error);}
}
function visualFor(visual){
  if(visual.type==='gates') return `<figure class="learning-visual"><figcaption>${visual.title}</figcaption><div class="gate-bars">${visual.bars.map(([label,width,text,fail])=>`<div><span>${label}</span><b class="${fail?'fail':''}" style="--w:${width}%">${text}</b></div>`).join('')}</div><small>${visual.note}</small></figure>`;
  if(visual.type==='regions') return `<figure class="learning-visual"><figcaption>${visual.title}</figcaption><div class="region-grid">${visual.regions.map(([name,body])=>`<div><strong>${name}</strong><p>${body}</p></div>`).join('')}</div><small>${visual.note}</small></figure>`;
  return `<figure class="learning-visual"><figcaption>${visual.title}</figcaption><div class="stage-chart">${visual.stages.map(([name,detail])=>`<span>${name}<small>${detail}</small></span>`).join('')}</div>${visual.note?`<small>${visual.note}</small>`:''}</figure>`;
}
async function openLesson(id,updateHash=true,sublessonId=null){
  const match=/^(m\d+)\.(\d+)$/.exec(id);
  if(!match || !catalog.modules.some(m=>m.id===match[1] && m.lessons.some(l=>l.id===id))) return renderDashboard();
  const moduleId=match[1],lessonNumber=Number(match[2]);
  if(updateHash) navigate('lesson',id);
  const request=++requestNumber;
  setView('lesson'); el('page-title').textContent=catalog.modules.find(m=>m.id===moduleId).lessons[lessonNumber-1].title;
  renderNav(moduleId);el('lesson-view').innerHTML='<p class="muted" role="status">Loading lesson…</p>';
  try{
    const [m,l]=await Promise.all([getJSON(`modules/${moduleId}/module.json`),getJSON(`modules/${moduleId}/lessons/${lessonNumber}.json`)]);
    if(request!==requestNumber) return;
    const info=m.lessons.find(x=>x.id===id),index=m.lessons.indexOf(info),links=[...info.resources,...m.regionalResources];
    el('lesson-view').innerHTML=`<div class="lesson-layout"><div class="lesson-main">
      <button class="back-link" onclick="renderModule('${m.id}')">← ${m.title}</button>
      <div class="section-head"><p class="eyebrow">MODULE ${catalog.modules.findIndex(x=>x.id===m.id)+1} · LESSON ${index+1} · ${info.duration}</p><h3>${info.title}</h3><p>${info.body}</p></div>
      ${m.banner?`<img class="lesson-banner" src="${m.banner.src}" alt="${m.banner.alt}" loading="lazy">`:''}
      ${visualFor(m.visual)}
      ${l.parts.map((part,i)=>`<article class="reading-part" id="part-${i+1}" data-sublesson-id="${part.id}"><p class="eyebrow">${part.id} · ${part.label.toUpperCase()}</p><h3>${part.title}</h3><p>${part.body}</p></article>`).join('')}
      <div class="card practice-card"><p class="eyebrow">YOUR TURN</p><h3>Make it yours</h3><p>${catalog.practicePrompt}</p></div>
      ${links.length?`<div class="card"><h3>Further reading</h3><p class="muted">Use these sources to check details and go deeper.</p><ul class="resources">${links.map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[0]} ↗</a></li>`).join('')}</ul></div>`:''}
      <label class="checkline completion"><input type="checkbox" ${state.completed[id]?'checked':''} onchange="toggleLesson('${id}',this.checked)"> I finished this lesson</label>
      <div class="lesson-actions"><button class="secondary" onclick="renderModule('${m.id}')">Back to module</button>${m.lessons[index+1]?`<button class="primary" onclick="openLesson('${m.lessons[index+1].id}')">Next lesson →</button>`:''}</div>
    </div><aside class="lesson-toc"><p class="eyebrow">IN THIS LESSON</p>${l.parts.map(part=>`<button onclick="openSublesson('${part.id}')">${part.id} · ${part.title}</button>`).join('')}<p class="muted">${info.duration} · Self paced</p></aside></div>`;
    if(sublessonId) el('lesson-view').querySelector(`[data-sublesson-id="${sublessonId}"]`)?.scrollIntoView({behavior:'smooth'});
  }catch(error){if(request===requestNumber) showLoadError('lesson',`openLesson('${id}',false)`);console.error(error);}
}
function openSublesson(id){
  navigate('lesson',id);
  el('lesson-view').querySelector(`[data-sublesson-id="${id}"]`)?.scrollIntoView({behavior:'smooth'});
}
function toggleLesson(id,value){state.completed[id]=value;save();updateOverall();renderNav(id.split('.')[0]);}
function toggleHomework(id,value){state.homework[id]=value;save();}
async function gradeQuiz(id){
  const form=el('quiz-form');
  try{
    const m=await getJSON(`modules/${id}/module.json`);
    if(el('quiz-form')!==form) return;
    let score=0,answered=0;
    m.quiz.forEach((q,qi)=>{const choice=form.querySelector(`input[name="q${qi}"]:checked`);if(choice){answered++;if(Number(choice.value)===q.answer)score++;}});
    if(answered<m.quiz.length){el('quiz-result').textContent='Answer every question before submitting.';return;}
    const result=Math.round(score/m.quiz.length*100);
    if(state.quiz[id]!==undefined && state.quizRevision[id]!==m.quizVersion){
      state.quizHistory ||= {};
      (state.quizHistory[id] ||= []).push({revision:state.quizRevision[id]||1,score:state.quiz[id]});
    }
    state.quiz[id]=result;state.quizRevision[id]=m.quizVersion;save();
    el('quiz-result').textContent=`Score: ${result}% — ${result>=80?'Pass. Explain each answer aloud before moving on.':'Review the lessons and retry; target 80% or higher.'}`;
  }catch(error){el('quiz-result').textContent='Could not load the quiz. Please retry.';console.error(error);}
}
async function renderReferences(updateHash=true){
  if(updateHash) navigate('references');
  const request=++requestNumber;
  setView('references');el('page-title').textContent='Reference Library';updateOverall();renderNav('references');
  el('references-view').innerHTML='<p class="muted" role="status">Loading references…</p>';
  try{
    const refs=await getJSON('references.json');if(request!==requestNumber)return;
    el('references-view').innerHTML=`<div class="section-head"><p class="eyebrow">CURATED EXTERNAL MATERIAL</p><h3>Reference library</h3><p>Use these sources for deeper study and to keep the program connected to current standards, regulation, technology, and executive practice.</p></div><div class="refs">${refs.map(r=>`<div class="ref"><strong><a href="${r[1]}" target="_blank" rel="noopener noreferrer">${r[0]} ↗</a></strong><small>${r[2]}</small></div>`).join('')}</div>`;
  }catch(error){if(request===requestNumber)showLoadError('references','renderReferences(false)');console.error(error);}
}
const themeButton=el('theme-toggle');
function updateThemeButton(){const dark=document.documentElement.dataset.theme==='dark';themeButton.textContent=dark?'☀':'☾';themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');themeButton.setAttribute('aria-pressed',String(dark));}
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('caio-theme',next);updateThemeButton();});
updateThemeButton();
function route(){
  const [type,rawId]=decodeURIComponent(location.hash.slice(1)).split('/');
  const id=type==='lesson'?(migration.lessons[rawId]||rawId):type==='module'&&rawId==='meval'?'m3':rawId;
  if(id!==rawId) history.replaceState(null,'','#'+type+'/'+id);
  if(type==='lesson'&&/^m\d+\.\d+\.\d+$/.test(id)) openLesson(id.slice(0,id.lastIndexOf('.')),false,id);
  else if(type==='lesson'&&id) openLesson(id,false);
  else if(type==='module'&&id) renderModule(id,false);
  else if(type==='references') renderReferences(false);
  else renderDashboard(false);
}
window.addEventListener('hashchange',()=>{if(catalog)route();});
window.addEventListener('popstate',()=>{if(catalog)route();});
(async()=>{
  try{
    [catalog,migration]=await Promise.all([getJSON('catalog.json'),getJSON('id-migration.json')]);
    migrateProgress(migration);route();
  }catch(error){el('dashboard-view').innerHTML='<div class="card"><h3>Course unavailable</h3><p>Refresh the page to try again.</p></div>';console.error(error);}
})();
