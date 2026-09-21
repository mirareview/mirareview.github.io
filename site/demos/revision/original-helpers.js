function splitTraitLines(value) {
  return String(value || "")
    .split(/[；;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueTraits(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    result.push(item);
  }
  return result;
}

function dimensionKeys(board) {
  return String(board?.dataset.dimensions || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function ensureDimensionCardIds(board) {
  board.querySelectorAll("[data-dimension-card]").forEach((card, index) => {
    if (!card.dataset.cardId) {
      card.dataset.cardId = `dim-card-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
    }
  });
}

function createDimensionCard(trait) {
  const card = document.createElement("div");
  card.className = "dimension-card";
  card.draggable = true;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.dataset.dimensionCard = "";
  card.dataset.trait = trait;
  card.dataset.cardId = `dim-card-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  card.textContent = trait;
  return card;
}

function updateDimensionBucketState(bucket) {
  const count = bucket.querySelectorAll("[data-dimension-card]").length;
  const countNode = bucket.querySelector("[data-dimension-count]");
  if (countNode) countNode.textContent = String(count);
  bucket.classList.toggle("is-empty", count === 0);
}

function syncDimensionOutputs(board, { markDirty = false } = {}) {
  for (const key of dimensionKeys(board)) {
    const output = board.querySelector(`[data-dimension-output="${key}"]`);
    const bucket = board.querySelector(`[data-dimension-bucket="${key}"]`);
    if (!output || !bucket) continue;
    const value = Array.from(bucket.querySelectorAll("[data-dimension-card]"))
      .map((card) => card.dataset.trait || card.textContent.trim())
      .filter(Boolean)
      .join("\n");
    if (output.value !== value) {
      output.value = value;
      if (markDirty) output.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  board.querySelectorAll("[data-dimension-bucket]").forEach(updateDimensionBucketState);
  syncDimensionEnglishOutput(board);
}

function syncDimensionEnglishOutput(board) {
  const form = board?.closest(".review-form");
  const output = board?.querySelector("[data-dimensions-english]");
  if (!form || !output) return;

  const chineseTraits = [
    ...splitTraitLines(form.elements.namedItem("base_groundtruth")?.value),
    ...splitTraitLines(form.elements.namedItem("completion_groundtruth")?.value),
  ];
  const englishTraits = [
    ...splitTraitLines(form.elements.namedItem("base_groundtruth_en")?.value),
    ...splitTraitLines(form.elements.namedItem("completion_groundtruth_en")?.value),
  ];
  const bilingualMap = new Map();
  chineseTraits.forEach((trait, index) => {
    if (englishTraits[index]) bilingualMap.set(trait, englishTraits[index]);
  });

  const dimensions = {};
  for (const key of dimensionKeys(board)) {
    const bucket = board.querySelector(`[data-dimension-bucket="${key}"]`);
    dimensions[key] = Array.from(bucket?.querySelectorAll("[data-dimension-card]") || [])
      .map((card) => bilingualMap.get(card.dataset.trait || card.textContent.trim()))
      .filter(Boolean);
  }
  output.value = JSON.stringify(dimensions);
}

function clearDimensionSelection(board) {
  board?.querySelectorAll(".dimension-card.is-selected").forEach((card) => {
    card.classList.remove("is-selected");
  });
  if (board) delete board.dataset.selectedCardId;
}

function isUnassignedDimensionBucket(bucket) {
  return bucket?.dataset.dimensionBucket === "unassigned";
}

function canMoveDimensionCardToBucket(card, bucket) {
  if (!card || !bucket) return false;
  if (isUnassignedDimensionBucket(bucket)) return false;
  return card.closest("[data-dimension-bucket]") !== bucket;
}

function moveDimensionCard(card, bucket, { markDirty = true } = {}) {
  const board = bucket.closest("[data-dimension-board]");
  const list = bucket.querySelector("[data-dimension-list]");
  if (!list || !canMoveDimensionCardToBucket(card, bucket)) {
    clearDimensionSelection(board);
    return;
  }
  list.appendChild(card);
  clearDimensionSelection(board);
  syncDimensionOutputs(board, { markDirty });
}

function currentGroundtruthTraits(board) {
  const form = board.closest(".review-form");
  return uniqueTraits([
    ...splitTraitLines(form?.elements.namedItem("base_groundtruth")?.value),
    ...splitTraitLines(form?.elements.namedItem("completion_groundtruth")?.value),
  ]);
}

function refreshDimensionBoardFromGroundtruth(board) {
  const assignments = new Map();
  board.querySelectorAll("[data-dimension-bucket]").forEach((bucket) => {
    const key = bucket.dataset.dimensionBucket || "unassigned";
    bucket.querySelectorAll("[data-dimension-card]").forEach((card) => {
      const trait = card.dataset.trait || card.textContent.trim();
      if (trait && !assignments.has(trait)) assignments.set(trait, key);
    });
  });

  const validKeys = new Set(["unassigned", ...dimensionKeys(board)]);
  board.querySelectorAll("[data-dimension-list]").forEach((list) => {
    list.innerHTML = "";
  });

  for (const trait of currentGroundtruthTraits(board)) {
    const key = validKeys.has(assignments.get(trait)) ? assignments.get(trait) : "unassigned";
    const bucket = board.querySelector(`[data-dimension-bucket="${key}"]`);
    bucket?.querySelector("[data-dimension-list]")?.appendChild(createDimensionCard(trait));
  }

  board.classList.remove("is-stale");
  syncDimensionOutputs(board, { markDirty: true });
}

function markDimensionBoardsStale() {
  document.querySelectorAll("[data-dimension-board]").forEach((board) => {
    board.classList.add("is-stale");
  });
}

function syncAllDimensionBoards({ markDirty = false } = {}) {
  document.querySelectorAll("[data-dimension-board]").forEach((board) => {
    ensureDimensionCardIds(board);
    syncDimensionOutputs(board, { markDirty });
  });
}

