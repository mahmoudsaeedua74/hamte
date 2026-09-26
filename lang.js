const dict = {
  ar: {
    dir: "rtl",
    lang: "ar",
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

function applyLang(code) {
  const t = dict[code];
  if (!t) return;

  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;

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
  const saved = localStorage.getItem("hatem-lang");
  if (saved === "ar" || saved === "en") start = saved;
} catch (_) {}

applyLang(start);
