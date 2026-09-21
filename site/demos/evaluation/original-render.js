function rubricOverview(rubrics) {
  const groups = [['base', '明确要求'], ['completion', '补全意图']];
  return `<div class="rubric-summary">${groups.map(([key, title]) => `<section class="panel flat"><h3>${title}</h3><ul class="rubric-list">${rubrics.filter((r) => r.source === key).map((r) => `<li>${esc(r.text_zh || r.text)}</li>`).join('') || '<li>无</li>'}</ul></section>`).join('')}</div>`;
}
function scale(clipId, metric) {
  const current = state.draft.ratings?.[clipId]?.[metric];
  return `<div class="segmented">${[1,2,3,4,5].map((n) => `<button class="choice ${current === n ? 'selected' : ''}" data-rating="${clipId}" data-metric="${metric}" data-value="${n}">${n}</button>`).join('')}</div>`;
}
function renderFigure(a) {
  const names = [['explicit_intent','明确意图'],['completed_intent','补全意图'],['overall_alignment','整体对齐']];
  const candidates = a.candidates.map((c) => `<article class="candidate" data-candidate="${c.clip_id}"><div class="candidate-head"><span class="candidate-label">候选 ${c.label}</span><span class="muted small">匿名音频</span></div><audio controls preload="none" data-audio="${c.clip_id}" src="${c.audio_url}"></audio>${names.map(([key,label]) => `<div class="metric"><span class="metric-name">${label}</span>${scale(c.clip_id,key)}</div>`).join('')}</article>`).join('');
  const best = new Set(state.draft.best_clip_ids || []);
  return `${rubricOverview(a.item.rubrics)}<p class="muted small">评分中 1 表示明显不符合，5 表示非常符合。最佳候选请优先依据意图对齐程度选择。</p><section class="candidates">${candidates}</section><section class="panel" data-best-panel><h2>最佳对齐候选</h2><div class="best-grid">${a.candidates.map((c) => `<label class="best-option"><input type="checkbox" data-best="${c.clip_id}" ${best.has(c.clip_id) ? 'checked' : ''}> 候选 ${c.label}</label>`).join('')}</div><p class="muted small">可以选择多个意图对齐程度相近的候选。</p><label class="field">可选备注<textarea id="note">${esc(state.draft.note || '')}</textarea></label></section>`;
}
function renderTable(a) {
  state.draft.labels ||= {};
  const labels = state.draft.labels;
  const legacyFivePoint = { score_1: 1, score_2: 5, score_3: 10, score_4: 15, score_5: 20 };
  for (const rubricId of Object.keys(labels)) {
    if (labels[rubricId] === 'satisfied') labels[rubricId] = 'score20_20';
    if (labels[rubricId] === 'not_satisfied') labels[rubricId] = 'score20_1';
    if (legacyFivePoint[labels[rubricId]]) labels[rubricId] = `score20_${legacyFivePoint[labels[rubricId]]}`;
  }
  const anchors = [
    ['1–4', '明显不满足'], ['5–8', '大部分不满足'], ['9–12', '部分满足'],
    ['13–16', '大体满足'], ['17–20', '明确充分满足'],
  ];
  const scoreDescription = (score) => {
    if (score <= 4) return '明显不满足';
    if (score <= 8) return '大部分不满足';
    if (score <= 12) return '部分满足';
    if (score <= 16) return '大体满足';
    return '明确充分满足';
  };
  const rubricRows = a.item.rubrics.map((r) => {
    const scoreButtons = Array.from({ length: 20 }, (_, index) => index + 1).map((score) => {
      const label = scoreDescription(score);
      const value = `score20_${score}`;
      return `<button class="choice ${labels[r.id] === value ? 'selected' : ''}" title="${score}分：${label}" aria-label="${score}分：${label}" data-label="${r.id}" data-value="${value}">${score}</button>`;
    }).join('');
    return `<div class="rubric-row" data-rubric="${r.id}"><div><div class="rubric-source">${r.source === 'base' ? 'Explicit / Base' : 'Completed'}</div><div>${esc(r.text_zh || r.text)}</div><details><summary>English</summary>${esc(r.text)}</details></div><div class="rubric-choice-set"><div class="segmented rubric-twenty">${scoreButtons}</div><button class="choice uncertain uncertain-choice ${labels[r.id] === 'uncertain' ? 'selected' : ''}" data-label="${r.id}" data-value="uncertain">不确定</button></div></div>`;
  }).join('');
  return `<section class="panel"><p class="muted small">每条要求独立评价满足程度；“不确定”仅表示听不出来或证据不足，不等同于中间分数。</p><audio controls preload="none" data-audio="${a.clip.clip_id}" src="${a.clip.audio_url}"></audio></section><section class="panel"><div class="row spread rubric-heading"><h2>逐项满足度</h2><span class="muted small">1 = 明显不满足 · 20 = 明确充分满足</span></div><div class="rubric-scale-key">${anchors.map(([score, label]) => `<span><strong>${score}</strong>${label}</span>`).join('')}<span class="uncertain-key"><strong>?</strong>不确定</span></div>${rubricRows}<label class="field">可选备注<textarea id="note">${esc(state.draft.note || '')}</textarea></label></section>`;
}
function submissionProblem({ mark = false } = {}) {
  if (!state.assignment) return '当前没有可提交的任务。';
  document.querySelectorAll('.validation-missing').forEach((node) => node.classList.remove('validation-missing'));
  if (state.assignment.kind === 'figure4') {
    const metrics = ['explicit_intent', 'completed_intent', 'overall_alignment'];
    const incomplete = [];
    for (const candidate of state.assignment.candidates) {
      const missing = metrics.filter((metric) => !Number.isInteger(state.draft.ratings?.[candidate.clip_id]?.[metric]));
      if (missing.length) {
        incomplete.push(`候选 ${candidate.label} 缺 ${missing.length} 项`);
        if (mark) document.querySelector(`[data-candidate="${candidate.clip_id}"]`)?.classList.add('validation-missing');
      }
    }
    const problems = [];
    if (incomplete.length) problems.push(`评分未完成：${incomplete.join('、')}`);
    if (!(state.draft.best_clip_ids || []).length) {
      problems.push('还没有选择“最佳对齐候选”');
      if (mark) document.querySelector('[data-best-panel]')?.classList.add('validation-missing');
    }
    return problems.join('；');
  }
  const validLabels = [...Array.from({ length: 20 }, (_, index) => `score20_${index + 1}`), 'uncertain'];
  const missing = state.assignment.item.rubrics.filter((rubric) => !validLabels.includes(state.draft.labels?.[rubric.id]));
  if (mark) missing.forEach((rubric) => document.querySelector(`[data-rubric="${CSS.escape(rubric.id)}"]`)?.classList.add('validation-missing'));
  return missing.length ? `还有 ${missing.length} 条要求尚未判断，已在页面中标出。` : '';
}
