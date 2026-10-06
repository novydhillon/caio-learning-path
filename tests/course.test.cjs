const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, 'course', file), 'utf8'));

test('module and sublesson IDs are contiguous and independently addressable', () => {
  const catalog = read('catalog.json'), migration = read('id-migration.json');
  assert.equal(catalog.modules.length, 11);
  assert.equal(Object.keys(migration.lessons).length, 39);
  catalog.modules.forEach((summary, mi) => {
    const moduleId = `m${mi+1}`;
    assert.equal(summary.id, moduleId);
    const module = read(`modules/${moduleId}/module.json`);
    assert.equal(module.id, moduleId);
    assert.equal(module.quizVersion, summary.quizVersion);
    assert.equal(module.quizVersion, 3);
    assert.ok(module.quiz.length >= module.lessons.length && module.quiz.length <= module.lessons.length*3);
    assert.equal(new Set(module.quiz.map(item=>item.q)).size, module.quiz.length);
    module.quiz.forEach(item=>{
      assert.equal(item.options.length,4);
      assert.equal(new Set(item.options).size,4);
      assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < 4);
      assert.ok(module.lessons.some(lesson=>lesson.id===item.lessonId));
      assert.ok(item.explanation?.trim());
    });
    module.lessons.forEach(lesson=>{
      const questions=module.quiz.filter(item=>item.lessonId===lesson.id);
      assert.ok(questions.length >= 1 && questions.length <= 3, `${lesson.id} needs 1–3 questions`);
    });
    summary.lessons.forEach((lesson, li) => {
      const id = `${moduleId}.${li+1}`;
      assert.equal(lesson.id, id);
      assert.equal(module.lessons[li].id, id);
      const detail = read(`modules/${moduleId}/lessons/${li+1}.json`);
      assert.equal(detail.id, id);
      assert.deepEqual(detail.parts.map(part=>part.id), Array.from({length:4},(_,i)=>`${id}.${i+1}`));
      assert.ok(detail.parts.every(part=>part.example && part.exercise && part.sources?.length >= 2 && part.body.split(/\s+/).length >= 150));
      assert.ok(detail.parts.every(part=>part.title && part.body));
    });
  });
  assert.equal(migration.modules.meval, 'm3');
  assert.equal(migration.lessons.m1l1, 'm1.1');
  assert.equal(migration.lessons.mevall4, 'm3.4');
});

test('legacy progress migrates and a sublesson loads without a page reload', async () => {
  const nodes = new Map();
  const node = id => nodes.get(id) || nodes.set(id, {
    innerHTML:'', textContent:'', classList:{add(){},remove(){}},
    setAttribute(){},addEventListener(){},scrollIntoView(){},querySelector(){return {scrollIntoView(){}}}
  }).get(id);
  const storage = new Map([['caio-learning-progress-v1',JSON.stringify({completed:{m1l1:true,mevall4:true},homework:{m3:true},quiz:{m6:80}})]]);
  const requests=[];
  const context = {
    document:{body:{dataset:{}},documentElement:{dataset:{theme:'dark'}},getElementById:node,querySelectorAll:()=>[],querySelector:()=>node('selection')},
    localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},
    location:{hash:'#lesson/m1.1.1',pathname:'/',search:''},
    history:{pushState(){},replaceState(){}},window:{scrollTo(){},addEventListener(){}},
    fetch:async url=>{requests.push(url);return {ok:true,json:async()=>read(url.slice('course/'.length))}},console
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
  await new Promise(resolve=>setImmediate(resolve));
  const progress=JSON.parse(storage.get('caio-learning-progress-v1'));
  assert.equal(progress.completed['m1.1'],true);
  assert.equal(progress.completed['m3.4'],true);
  assert.equal(progress.homework.m4,true);
  assert.equal(progress.quiz.m7,80);
  assert.match(node('lesson-view').innerHTML,/data-sublesson-id="m1\.1\.1"/);
  assert.match(node('lesson-view').innerHTML,/Turn the mandate into decisions/);
  assert.deepEqual(requests,['course/catalog.json','course/id-migration.json','course/modules/m1/module.json','course/modules/m1/lessons/1.json']);
  await vm.runInContext("renderModule('m6')",context);
  assert.match(node('section-view').innerHTML,/Canadian privacy regulators/);
  assert.match(node('section-view').innerHTML,/<a href="#references">View the full reference library/);
  assert.ok(requests.includes('course/modules/m6/lessons/1.json'));
  const module6Details=read('modules/m6/lessons/1.json');
  assert.match(node('section-view').innerHTML,new RegExp(module6Details.parts[0].sources[0][1].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  await vm.runInContext("renderModule('m7')",context);
  assert.match(node('section-view').innerHTML,/Previous score: 80% \(earlier quiz\)/);
  assert.doesNotMatch(node('section-view').innerHTML,/<details class="quiz-feedback"/);
  vm.runInContext('renderDashboard()',context);
  assert.match(node('dashboard-view').innerHTML,/>0\/11<\/div><p class="muted">Retrieval practice/);
  await vm.runInContext("renderModule('m7')",context);
  const answers=read('modules/m7/module.json').quiz.map(item=>item.answer);
  node('quiz-form').querySelector=selector=>({value:answers[Number(selector.match(/q(\d+)/)[1]) ]});
  await vm.runInContext("gradeQuiz('m7')",context);
  const updated=JSON.parse(storage.get('caio-learning-progress-v1'));
  assert.equal(updated.quiz.m7,100);
  assert.equal(updated.quizRevision.m7,3);
  assert.equal(updated.quizHistory.m7[0].score,80);
  assert.match(node('quiz-feedback').innerHTML,/Question 1 · Correct/);
  assert.match(node('quiz-feedback').innerHTML,/Best answer:/);
  assert.doesNotMatch(node('quiz-feedback').innerHTML,/undefined/);
  assert.match(node('quiz-feedback').innerHTML,/#lesson\/m7\.1/);

  // Retaking an expanded quiz preserves a score from the preceding quiz version.
  vm.runInContext("state.quiz.m7=75;state.quizRevision.m7=2;state.quizHistory.m7=[];save()",context);
  node('quiz-form').querySelector=()=>null;
  await vm.runInContext("gradeQuiz('m7')",context);
  assert.equal(JSON.parse(storage.get('caio-learning-progress-v1')).quiz.m7,75);
  assert.equal(node('quiz-feedback').innerHTML,'');
  node('quiz-form').querySelector=selector=>({value:answers[Number(selector.match(/q(\d+)/)[1])]});
  await vm.runInContext("gradeQuiz('m7')",context);
  const retaken=JSON.parse(storage.get('caio-learning-progress-v1'));
  assert.equal(retaken.quizRevision.m7,3);
  assert.equal(retaken.quizHistory.m7[0].revision,2);
  assert.equal(retaken.quizHistory.m7[0].score,75);
  node('quiz-form').querySelector=selector=>{
    const qi=Number(selector.match(/q(\d+)/)[1]);
    return {value:qi===0?(answers[0]+1)%4:answers[qi]};
  };
  await vm.runInContext("gradeQuiz('m7')",context);
  const corrected=JSON.parse(storage.get('caio-learning-progress-v1'));
  assert.equal(corrected.quiz.m7,Math.round((answers.length-1)/answers.length*100));
  assert.equal(corrected.quizHistory.m7.length,1);
  assert.match(node('quiz-feedback').innerHTML,/<details class="quiz-feedback" open><summary>Question 1 · Review/);
});
