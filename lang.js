const dict = {
  ar: {
    dir: "rtl",
    lang: "ar",
    locale: "ar_SA",
    title: "حاتم ال منصور | خبير نمو التجارة الإلكترونية",
    description:
      "حاتم ال منصور — خبير نمو التجارة الإلكترونية، مؤسس أثر آد وبودكاست ديل. بناء ونمو العلامات والمتاجر الإلكترونية بمحتوى عملي من واقع السوق.",
    name: "حاتم ال منصور",
    bio: "متخصص في التجارة الإلكترونية، ومؤسس أثر آد لبناء ونمو العلامات التجارية الإلكترونية. ومؤسس بودكاست ديل؛ نوثّق فيه تجارب أهل السوق ونفكك كواليس التجارة الإلكترونية.",
    contactKicker: "تواصل مباشر",
    contactTitle: "إدارة الأعمال",
    podcastKicker: "بودكاست",
    podcastTitle: "بودكاست ديل",
    podcastMeta: "تجارب أهل السوق",
    footer: "حاتم ال منصور",
  },
  en: {
    dir: "ltr",
    lang: "en",
    locale: "en_US",
    title: "Hatem Al Mansoor | E-commerce Growth Expert",
    description:
      "Hatem Al Mansoor — e-commerce growth expert, founder of Athar Ad and Deal Podcast. Building and scaling online brands with practical market insight.",
    name: "Hatem Al Mansoor",
    bio: "E-commerce specialist and founder of Athar Ad, building and growing online brands. Founder of Deal Podcast — documenting market stories and unpacking what happens behind e-commerce.",
    contactKicker: "Direct contact",
    contactTitle: "Business Management",
    podcastKicker: "Podcast",
    podcastTitle: "Deal Podcast",
    podcastMeta: "Market stories",
    footer: "Hatem Al Mansoor",
  },
};

function setMeta(attr, key, value) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.setAttribute("content", value);
}

function applyLang(code) {
  const t = dict[code];
  if (!t) return;

  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;
  document.title = t.title;

  setMeta("name", "description", t.description);
  setMeta("name", "author", t.name);
  setMeta("property", "og:locale", t.locale);
  setMeta("property", "og:title", t.title);
  setMeta("property", "og:description", t.description);
  setMeta("property", "og:site_name", t.name);
  setMeta("name", "twitter:title", t.title);
  setMeta("name", "twitter:description", t.description);

  const portrait = document.querySelector(".portrait");
  if (portrait) portrait.alt = t.name;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] != null) el.textContent = t[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.getAttribute("data-lang") === code;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  try {
    localStorage.setItem("hatem-lang", code);
  } catch (_) {}
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
});

let start = "ar";
try {
  const params = new URLSearchParams(location.search);
  const fromUrl = params.get("lang");
  if (fromUrl === "ar" || fromUrl === "en") {
    start = fromUrl;
  } else {
    const saved = localStorage.getItem("hatem-lang");
    if (saved === "ar" || saved === "en") start = saved;
  }
} catch (_) {}

applyLang(start);
