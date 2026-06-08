(function () {
  function initThanksPage() {
    var params = new URLSearchParams(window.location.search);
    var prenom = (params.get("prenom") || "").trim().slice(0, 80);
    var intent = params.get("intent") === "buy" ? "buy" : "sell";
    var lang = params.get("lang");

    document.body.setAttribute("data-intent", intent);

    if ((lang === "en" || lang === "fr") && window.SiteI18n) {
      window.SiteI18n.setLang(lang);
    } else if (window.SiteI18n) {
      window.SiteI18n.apply();
    }

    var nameEl = document.getElementById("thanks-prenom");
    var wrapEl = document.getElementById("thanks-prenom-wrap");

    if (prenom && nameEl) {
      nameEl.textContent = prenom;
    } else if (wrapEl) {
      wrapEl.hidden = true;
    }

    if (window.SiteI18n) {
      document.title =
        window.SiteI18n.t("thanks.page.greeting") +
        (prenom ? " " + prenom : "") +
        " · FlashImmobilier";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThanksPage);
  } else {
    initThanksPage();
  }
})();
