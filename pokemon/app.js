const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

const LANGS = { fr: "Français", en: "English", ja: "日本語", it: "Italiano" };
const FLAG = { fr: "🇫🇷", en: "🇬🇧", ja: "🇯🇵", it: "🇮🇹" };
let lang = localStorage.getItem("pokelang");
if (!LANGS[lang]) lang = "fr";

let sets = [], cards = [], curCard = null, curSet = null, view = "sets";
const setCache = {}, cardCache = {}, detailCache = {};

let col = [];
try {
  col = JSON.parse(localStorage.getItem("pokebinder") || "[]");
} catch {
  col = [];
}
const save = () => {
  localStorage.setItem("pokebinder", JSON.stringify(col));
  $("#count").textContent = col.reduce((n, c) => n + c.qty, 0);
};

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------- API TCGdex (timeout + réessais) ---------- */
async function api(path, l = lang, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(`https://api.tcgdex.net/v2/${l}${path}`, {
        signal: ctrl.signal,
      });
      clearTimeout(to);
      if (r.ok) return await r.json();
      if (r.status === 404) throw new Error("404");
    } catch (e) {
      clearTimeout(to);
      if (i === tries - 1 || e.message === "404") throw e;
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
  }
  throw new Error("Serveur indisponible");
}

const imgUrl = (base, q = "low") => (base ? `${base}/${q}.webp` : "");
const logoList = (s) =>
  [
    s.logo && s.logo + ".webp",
    s.logo && s.logo + ".png",
    s.symbol && s.symbol + ".webp",
    s.symbol && s.symbol + ".png",
  ].filter(Boolean);
const official = (set) => set?.cardCount?.official ?? set?.cardCount?.total ?? "?";
const priceOf = (d) => {
  const p = d?.pricing?.cardmarket;
  const v = p?.avg ?? p?.trend ?? 0;
  return v ? Math.round(v * 100) / 100 : 0;
};
async function cardDetail(id, l) {
  const k = l + "/" + id;
  return (detailCache[k] ||= await api("/cards/" + encodeURIComponent(id), l));
}

/* ---------- Images d'éditions : secours, badge, illustration ---------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries)
      if (en.isIntersecting) {
        io.unobserve(en.target);
        loadCover(en.target);
      }
  },
  { rootMargin: "200px" },
);

async function loadCover(tile) {
  const l = lang,
    id = tile.dataset.id,
    key = l + "/" + id;
  try {
    if (!cardCache[key])
      cardCache[key] = await api("/sets/" + encodeURIComponent(id), l);
    if (l !== lang || !tile.isConnected) return;
    const c = [...(cardCache[key].cards || [])].reverse().find((x) => x.image);
    if (!c) return;
    tile.classList.add("has-cover");
    tile.querySelector(".lg").innerHTML =
      `<img loading="lazy" src="${esc(imgUrl(c.image))}" alt="">`;
  } catch {}
}

document.addEventListener(
  "error",
  (e) => {
    const i = e.target;
    if (!(i instanceof HTMLImageElement) || !i.dataset.sid) return;
    let rest = JSON.parse(i.dataset.f || "[]");
    if (!rest.length && !i.dataset.en) {
      i.dataset.en = "1";
      const en = lang !== "en" && setCache.en?.find((x) => x.id === i.dataset.sid);
      if (en) rest = logoList(en);
    }
    if (rest.length) {
      i.dataset.f = JSON.stringify(rest.slice(1));
      i.src = rest[0];
    } else if (i.id === "setLogo") i.hidden = true;
    else {
      const b = Object.assign(document.createElement("span"), {
        className: "badge",
        textContent: i.dataset.sid.toUpperCase(),
      });
      const tile = i.closest(".tile");
      i.replaceWith(b);
      if (tile) io.observe(tile);
    }
  },
  true,
);

/* ---------- Navigation ---------- */
function show(v) {
  view = v;
  ["sets", "cards", "col"].forEach((n) => ($("#v-" + n).hidden = n !== v));
  document
    .querySelectorAll("nav button")
    .forEach((b) =>
      b.classList.toggle("on", b.dataset.view === (v === "cards" ? "sets" : v)),
    );
  if (v === "col") renderCol();
  window.scrollTo(0, 0);
}
document
  .querySelectorAll("nav button")
  .forEach((b) => (b.onclick = () => show(b.dataset.view)));
$("#back").onclick = () => show("sets");

/* ---------- Langue ---------- */
$("#lang").value = lang;
$("#lang").onchange = () => {
  lang = $("#lang").value;
  localStorage.setItem("pokelang", lang);
  $("#setSearch").value = "";
  if (view === "cards") show("sets");
  loadSets();
};

/* ---------- Éditions ---------- */
async function fetchSets(l) {
  if (!setCache[l]) {
    const series = await api("/series", l);
    const full = await Promise.all(
      series.map((s) =>
        api("/series/" + encodeURIComponent(s.id), l).catch(() => null),
      ),
    );
    setCache[l] = full
      .filter(Boolean)
      .reverse()
      .flatMap((s) =>
        (s.sets || []).slice().reverse().map((x) => ({ ...x, series: s.name })),
      );
  }
  return setCache[l];
}

async function loadSets() {
  const l = lang;
  $("#setStatus").textContent = "Chargement des éditions…";
  $("#setList").innerHTML = "";
  try {
    const list = await fetchSets(l);
    if (l !== lang) return;
    sets = list;
    $("#setStatus").textContent =
      sets.length +
      " éditions (" +
      LANGS[l] +
      "). Clique sur une édition pour voir ses cartes.";
    renderSets();
    if (l !== "en") fetchSets("en").catch(() => {});
  } catch (e) {
    if (l !== lang) return;
    $("#setStatus").innerHTML =
      "Impossible de charger les éditions (" +
      esc(e.message) +
      "). " +
      '<button id="retrySets" class="ghost">Réessayer</button>';
    $("#retrySets").onclick = loadSets;
  }
}

function renderSets() {
  const q = $("#setSearch").value.toLowerCase().trim();
  const bySeries = new Map();
  sets
    .filter((s) => !q || (s.name + " " + s.series).toLowerCase().includes(q))
    .forEach((s) => {
      if (!bySeries.has(s.series)) bySeries.set(s.series, []);
      bySeries.get(s.series).push(s);
    });
  $("#setList").innerHTML =
    [...bySeries]
      .map(
        ([ser, list]) =>
          `<h2 class="series">${esc(ser)}</h2><div class="sets">` +
          list
            .map(
              (s) =>
                `<div class="tile" tabindex="0" role="button" data-id="${esc(s.id)}">
        <div class="lg">${
          logoList(s).length
            ? `<img loading="lazy" src="${esc(logoList(s)[0])}" data-f="${esc(JSON.stringify(logoList(s).slice(1)))}" data-sid="${esc(s.id)}" alt="">`
            : `<span class="badge">${esc(s.id.toUpperCase())}</span>`
        }</div>
        <b>${esc(s.name)}</b>
        <small>${esc(s.cardCount?.total ?? "?")} cartes</small>
      </div>`,
            )
            .join("") +
          "</div>",
      )
      .join("") || '<p class="status">Aucune édition trouvée.</p>';
  document
    .querySelectorAll("#setList .tile:has(.badge)")
    .forEach((t) => io.observe(t));
}
$("#setSearch").oninput = renderSets;
const openFromEvent = (e) => {
  const t = e.target.closest(".tile");
  if (t && (e.type === "click" || e.key === "Enter" || e.key === " "))
    openSet(t.dataset.id);
};
$("#setList").addEventListener("click", openFromEvent);
$("#setList").addEventListener("keydown", openFromEvent);

/* ---------- Cartes d'une édition ---------- */
async function openSet(id) {
  const l = lang;
  curSet = sets.find((s) => s.id === id);
  cards = [];
  const lg = $("#setLogo"),
    [first, ...others] = logoList(curSet);
  lg.dataset.sid = curSet.id;
  lg.dataset.f = JSON.stringify(others);
  delete lg.dataset.en;
  lg.hidden = !first;
  if (first) lg.src = first;
  $("#setName").textContent = curSet.name;
  $("#setMeta").textContent = curSet.series;
  $("#cardSearch").value = "";
  $("#cardList").innerHTML = "";
  $("#cardStatus").textContent = "Chargement des cartes…";
  show("cards");
  try {
    const key = l + "/" + id;
    if (!cardCache[key])
      cardCache[key] = await api("/sets/" + encodeURIComponent(id), l);
    if (l !== lang || curSet.id !== id) return;
    const d = cardCache[key];
    curSet = { ...curSet, ...d, series: curSet.series };
    cards = d.cards || [];
    $("#setMeta").textContent =
      curSet.series +
      (d.releaseDate ? " – sorti le " + d.releaseDate : "") +
      " – " +
      (d.cardCount?.total ?? cards.length) +
      " cartes";
    renderCards();
    $("#cardStatus").textContent =
      cards.length + " cartes. Clique sur une carte pour l’agrandir ou l’ajouter.";
  } catch (e) {
    if (l !== lang) return;
    $("#cardStatus").innerHTML =
      "Erreur de chargement (" +
      esc(e.message) +
      "). " +
      '<button id="retry" class="ghost">Réessayer</button>';
    $("#retry").onclick = () => openSet(id);
  }
}

const owned = (id) =>
  col
    .filter((c) => c.apiId === id && (c.lang || "en") === lang)
    .reduce((n, c) => n + c.qty, 0);

function renderCards() {
  const q = $("#cardSearch").value.toLowerCase().trim();
  $("#cardList").innerHTML = cards
    .filter((c) => !q || (c.name + " " + c.localId).toLowerCase().includes(q))
    .map((c) => {
      const n = owned(c.id);
      return `<div class="card" tabindex="0" data-id="${esc(c.id)}">
      ${n ? `<span class="own">×${n}</span>` : ""}
      ${c.image ? `<img loading="lazy" src="${esc(imgUrl(c.image))}" alt="${esc(c.name)}">` : '<div class="ph">?</div>'}
      <p><b>${esc(c.name)}</b><span>#${esc(c.localId)}</span></p></div>`;
    })
    .join("");
}
$("#cardSearch").oninput = renderCards;
const cardOpen = (e) => {
  const t = e.target.closest(".card");
  if (t && (e.type === "click" || e.key === "Enter")) openCard(t.dataset.id);
};
$("#cardList").addEventListener("click", cardOpen);
$("#cardList").addEventListener("keydown", cardOpen);

async function openCard(id) {
  const l = lang;
  curCard = cards.find((c) => c.id === id);
  $("#bigImg").src = imgUrl(curCard.image, "high");
  $("#bigName").textContent = curCard.name;
  $("#bigInfo").textContent = "Chargement des détails…";
  $("#bigQty").value = 1;
  $("#bigPrice").value = "";
  $("#bigNote").value = "";
  $("#dCard").showModal();
  try {
    const d = await cardDetail(id, l);
    if (curCard?.id !== id) return;
    const price = priceOf(d);
    $("#bigInfo").textContent =
      `${FLAG[l]} ${curSet.name} – #${d.localId}/${official(d.set || curSet)} – ${d.rarity || "Rareté inconnue"}` +
      (price ? ` – ~${price} €` : "");
    if (!$("#bigPrice").value) $("#bigPrice").value = price || "";
  } catch {
    $("#bigInfo").textContent = `${FLAG[l]} ${curSet.name} – #${curCard.localId}`;
  }
}

$("#bigAdd").onclick = () => {
  const qty = Math.max(1, +$("#bigQty").value || 1),
    cond = $("#bigCond").value,
    price = +$("#bigPrice").value || 0,
    note = $("#bigNote").value.trim();
  const ex = col.find(
    (c) => c.apiId === curCard.id && c.cond === cond && (c.lang || "en") === lang,
  );
  if (ex) {
    ex.qty += qty;
    if (note) ex.note = note;
    if (price) ex.price = price;
  } else
    col.push({
      id: crypto.randomUUID(),
      apiId: curCard.id,
      lang,
      name: curCard.name,
      set: curSet.name,
      number: curCard.localId + "/" + official(curSet),
      img: imgUrl(curCard.image),
      cond,
      qty,
      price,
      note,
    });
  save();
  renderCards();
  $("#dCard").close();
  toast(curCard.name + " ajoutée !");
};

/* ---------- Ma collection ---------- */
function renderCol() {
  const q = $("#colSearch").value.toLowerCase().trim();
  const list = col.filter(
    (c) =>
      !q ||
      (c.name + " " + c.set + " " + c.note + " " + LANGS[c.lang || "en"])
        .toLowerCase()
        .includes(q),
  );
  const total = col.reduce((n, c) => n + c.qty * (c.price || 0), 0);
  $("#stats").textContent = col.length
    ? `${col.reduce((n, c) => n + c.qty, 0)} cartes (${col.length} fiches) – valeur estimée : ${total.toFixed(2)} €`
    : "Ta collection est vide. Ajoute une carte depuis une édition, ou crée-la toi-même avec « + Ajouter une carte ».";
  $("#colList").innerHTML = list
    .map(
      (c) => `<div class="card" style="cursor:default">
    ${c.img ? `<img src="${esc(c.img)}" alt="${esc(c.name)}">` : '<div class="ph">?</div>'}
    <p><b>${esc(c.name)}</b><span>${FLAG[c.lang || "en"]} ${esc(c.set)} ${esc(c.number)}</span><span>${esc(c.cond)}${c.price ? " – " + c.price + " €" : ""}</span>${c.note ? `<span>${esc(c.note)}</span>` : ""}</p>
    <div class="ctl"><button data-a="-" data-id="${c.id}">−</button><b>×${c.qty}</b><button data-a="+" data-id="${c.id}">+</button><button class="del" data-a="x" data-id="${c.id}" aria-label="Supprimer">🗑</button></div>
  </div>`,
    )
    .join("");
}
$("#colSearch").oninput = renderCol;
$("#colList").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const c = col.find((x) => x.id === b.dataset.id);
  if (!c) return;
  if (b.dataset.a === "+") c.qty++;
  if (b.dataset.a === "-") c.qty = Math.max(1, c.qty - 1);
  if (b.dataset.a === "x" && confirm("Supprimer « " + c.name + " » ?"))
    col = col.filter((x) => x !== c);
  save();
  renderCol();
};

/* ---------- Carte perso ---------- */
function shrink(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => {
      const i = new Image();
      i.onload = () => {
        const k = Math.min(1, 400 / i.width),
          cv = document.createElement("canvas");
        cv.width = i.width * k;
        cv.height = i.height * k;
        cv.getContext("2d").drawImage(i, 0, 0, cv.width, cv.height);
        res(cv.toDataURL("image/jpeg", 0.8));
      };
      i.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

let cImgUrl = "", cApiId = null, cTimer, pickRes = [];

$("#addCustom").onclick = () => {
  document.querySelectorAll("#dCustom input").forEach((i) => (i.value = ""));
  $("#cQty").value = 1;
  $("#cLang").value = lang;
  cImgUrl = "";
  cApiId = null;
  $("#cResults").innerHTML = "";
  $("#cPreview").hidden = true;
  $("#dCustom").showModal();
};

$("#cSearch").oninput = () => {
  clearTimeout(cTimer);
  cTimer = setTimeout(searchPick, 400);
};
$("#cLang").onchange = searchPick;

async function searchPick() {
  const q = $("#cSearch").value.trim(),
    l = $("#cLang").value,
    box = $("#cResults");
  if (q.length < 2) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = '<p class="status">Recherche…</p>';
  try {
    const res = await api(
      `/cards?name=${encodeURIComponent(q)}&pagination:page=1&pagination:itemsPerPage=24`,
      l,
    );
    if (q !== $("#cSearch").value.trim() || l !== $("#cLang").value) return;
    pickRes = res;
    box.innerHTML =
      pickRes
        .map(
          (c, i) =>
            `<button type="button" data-i="${i}" title="${esc(c.name)} #${esc(c.localId)}">
              ${c.image ? `<img loading="lazy" src="${esc(imgUrl(c.image))}" alt="${esc(c.name)}">` : `<span class="noimg">${esc(c.name)}</span>`}</button>`,
        )
        .join("") || '<p class="status">Aucune carte trouvée.</p>';
  } catch {
    box.innerHTML = '<p class="status">Erreur de recherche, réessaie.</p>';
  }
}

$("#cResults").onclick = async (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const c = pickRes[+b.dataset.i],
    l = $("#cLang").value;
  $("#cName").value = c.name;
  $("#cNum").value = c.localId;
  cApiId = c.id;
  cImgUrl = imgUrl(c.image);
  $("#cPreview").hidden = !cImgUrl;
  $("#cPreview").src = cImgUrl;
  try {
    const d = await cardDetail(c.id, l);
    $("#cSet").value = d.set?.name || "";
    $("#cNum").value = d.localId + "/" + official(d.set);
    $("#cPrice").value = priceOf(d) || "";
  } catch {
    toast("Détails indisponibles, complète à la main");
  }
};

$("#cSave").onclick = async () => {
  const name = $("#cName").value.trim();
  if (!name) {
    toast("Le nom est obligatoire");
    return;
  }
  const f = $("#cImg").files[0];
  col.push({
    id: crypto.randomUUID(),
    apiId: cApiId,
    lang: $("#cLang").value,
    name,
    set: $("#cSet").value.trim(),
    number: $("#cNum").value.trim(),
    img: f ? await shrink(f) : cImgUrl,
    cond: $("#cCond").value,
    qty: Math.max(1, +$("#cQty").value || 1),
    price: +$("#cPrice").value || 0,
    note: $("#cNote").value.trim(),
  });
  try {
    save();
  } catch {
    col.pop();
    toast("Stockage plein : photo trop lourde ?");
    return;
  }
  $("#dCustom").close();
  renderCol();
  toast("Carte enregistrée");
};

/* ---------- Export / import ---------- */
$("#exp").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(col, null, 1)], { type: "application/json" }),
  );
  a.download = "ma-collection-pokemon.json";
  a.click();
};
$("#imp").onchange = async (e) => {
  try {
    const data = JSON.parse(await e.target.files[0].text());
    if (!Array.isArray(data)) throw 0;
    col = data;
    save();
    renderCol();
    toast("Collection importée");
  } catch {
    toast("Fichier invalide");
  }
  e.target.value = "";
};

save();
loadSets();
