window.STORIES = [
  {
    id: "squads",
    file: "story-01-squads.html",
    title: "Squad Structure",
    author: "Hitendra",
    section: "AI Strategy",
    dateAdded: "2026-05-18",
    dateUpdated: "2026-05-18",
  },
  {
    id: "techdebt",
    file: "story-02-techdebt.html",
    title: "Platform Reliability",
    author: "Vishal & Haseeb",
    section: "AI Strategy",
    dateAdded: "2026-05-18",
    dateUpdated: "2026-05-18",
  },
  {
    id: "adfree",
    file: "story-03-adfree.html",
    title: "Ad-Free Cialfo",
    author: "Rajat & Teresa",
    section: "AI Strategy",
    dateAdded: "2026-05-18",
    dateUpdated: "2026-05-18",
  },
  {
    id: "admin",
    file: "story-04-admin.html",
    title: "Admin Panel Intelligence",
    author: "William & Hitendra",
    section: "AI Strategy",
    dateAdded: "2026-05-18",
    dateUpdated: "2026-05-18",
  },
  {
    id: "airtable",
    file: "story-05-airtable.html",
    title: "Airtable as Velocity Layer",
    author: "Charles",
    section: "AI Strategy",
    dateAdded: "2026-05-18",
    dateUpdated: "2026-05-18",
  },
];

window.AH26 = window.AH26 || {};
window.AH26.LOCALSTORAGE_KEY = "ai26_agenda";

window.AH26.loadConfig = function () {
  let raw = {};
  try {
    raw = JSON.parse(localStorage.getItem(window.AH26.LOCALSTORAGE_KEY) || "{}") || {};
  } catch (e) {
    raw = {};
  }
  const allIds = window.STORIES.map((s) => s.id);
  const validOrder = Array.isArray(raw.order) ? raw.order.filter((id) => allIds.includes(id)) : [];
  const order = [...validOrder, ...allIds.filter((id) => !validOrder.includes(id))];
  const enabled = {};
  allIds.forEach((id) => {
    enabled[id] = raw.enabled && raw.enabled[id] !== undefined ? !!raw.enabled[id] : true;
  });
  return { order, enabled };
};

window.AH26.saveConfig = function (config) {
  try {
    localStorage.setItem(window.AH26.LOCALSTORAGE_KEY, JSON.stringify(config));
  } catch (e) {}
};

window.AH26.enabledInOrder = function (config) {
  return config.order.filter((id) => config.enabled[id]);
};

window.AH26.findStory = function (id) {
  return window.STORIES.find((s) => s.id === id) || null;
};

window.AH26.formatDate = function (iso) {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return String(iso);
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

window.AH26.currentStoryId = function () {
  const name = (location.pathname.split("/").pop() || "").toLowerCase();
  const m = name.match(/^story-\d+-(.+)\.html$/);
  return m ? m[1] : null;
};
