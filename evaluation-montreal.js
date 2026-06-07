(function () {
  var body = document.body;
  var navCta = document.getElementById("nav-cta");
  var sellBtn = document.querySelector('[data-intent-select="sell"]');
  var buyBtn = document.querySelector('[data-intent-select="buy"]');
  var sellForm = document.getElementById("sell-lead-form");
  var buyForm = document.getElementById("buy-lead-form");
  var modal = document.getElementById("thanks-modal");
  var thanksName = document.getElementById("thanks-name");

  function syncForms(activeIntent) {
    var forms = [
      { el: sellForm, intent: "sell" },
      { el: buyForm, intent: "buy" },
    ];

    forms.forEach(function (item) {
      if (!item.el) return;
      var active = item.intent === activeIntent;
      item.el.hidden = !active;
      item.el.setAttribute("aria-hidden", active ? "false" : "true");
      item.el.querySelectorAll("input, select, textarea, button").forEach(function (field) {
        if (field.name === "website") {
          field.disabled = active;
          return;
        }
        field.disabled = !active;
      });
    });
  }

  function setIntent(intent) {
    var next = intent === "buy" ? "buy" : "sell";
    body.setAttribute("data-intent", next);
    syncForms(next);

    if (sellBtn && buyBtn) {
      sellBtn.classList.toggle("is-active", next === "sell");
      buyBtn.classList.toggle("is-active", next === "buy");
      sellBtn.setAttribute("aria-pressed", next === "sell" ? "true" : "false");
      buyBtn.setAttribute("aria-pressed", next === "buy" ? "true" : "false");
    }

    if (navCta) {
      navCta.textContent =
        next === "buy" ? "Parler à Jennie-Lee" : "Évaluation gratuite";
    }

    document.title =
      next === "buy"
        ? "Acheter en Outaouais · FlashImmobilier · Jennie Lee Desbiens"
        : "Évaluation gratuite · Gatineau & Outaouais · FlashImmobilier";

    if (location.hash !== "#" + next) {
      history.replaceState(null, "", "#" + next);
    }
  }

  document.querySelectorAll("[data-intent-select]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setIntent(btn.getAttribute("data-intent-select"));
      var form = document.getElementById("form");
      if (form && window.matchMedia("(min-width: 901px)").matches === false) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  var hash = (location.hash || "").replace("#", "");
  if (hash === "acheter" || hash === "buy") {
    setIntent("buy");
  } else if (hash === "vendre" || hash === "sell") {
    setIntent("sell");
  } else {
    setIntent(body.getAttribute("data-intent") || "sell");
  }

  function clearErrors(form) {
    form.querySelectorAll("[data-error]").forEach(function (el) {
      el.textContent = "";
    });
    var banner = form.querySelector(".form-banner-error");
    if (banner) {
      banner.hidden = true;
      banner.textContent = "";
    }
  }

  function showErrors(form, err) {
    Object.keys(err).forEach(function (key) {
      var el = form.querySelector('[data-error="' + key + '"]');
      if (el) el.textContent = err[key];
    });
  }

  function showBanner(form, message) {
    var banner = form.querySelector(".form-banner-error");
    if (!banner) return;
    banner.textContent = message;
    banner.hidden = !message;
  }

  function formToPayload(form) {
    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (value, key) {
      payload[key] = value;
    });
    return payload;
  }

  function validateClient(form, payload) {
    var err = {};
    var intent = payload.intent;

    if (!payload.prenom || !String(payload.prenom).trim()) err.prenom = "Requis";
    if (!window.LeadSubmit.validatePhone(payload.telephone)) {
      err.telephone = "Téléphone invalide";
    }
    if (payload.email && !window.LeadSubmit.validateEmail(payload.email)) {
      err.email = "Courriel invalide";
    }

    if (intent === "sell") {
      if (!payload.adresse || String(payload.adresse).trim().length < 5) {
        err.adresse = "Requis";
      }
      if (!payload.typePropriete) err.typePropriete = "Requis";
      if (!payload.quandVendre) err.quandVendre = "Requis";
    }

    if (intent === "buy") {
      if (!payload.secteur) err.secteur = "Requis";
      if (!payload.typePropriete) err.typePropriete = "Requis";
      if (!payload.budget) err.budget = "Requis";
      if (!payload.quandAcheter) err.quandAcheter = "Requis";
    }

    return err;
  }

  function openThanks(prenom) {
    if (thanksName) thanksName.textContent = prenom ? " " + prenom.trim() : "";
    if (modal) modal.hidden = false;
  }

  function bindLeadForm(form) {
    if (!form || !window.LeadSubmit) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(form);

      var payload = formToPayload(form);
      var err = validateClient(form, payload);
      if (Object.keys(err).length) {
        showErrors(form, err);
        var firstError = form.querySelector(".form-field-error:not(:empty)");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      if (!window.LeadSubmit.webhookUrl()) {
        showBanner(
          form,
          "Webhook Make non configuré (lead-config.js). Appelez le 873-353-5386."
        );
        return;
      }

      var submitBtn = form.querySelector("[data-lead-submit]");
      var btnLabel = submitBtn && submitBtn.querySelector("span");
      var originalHtml = btnLabel ? btnLabel.innerHTML : "";

      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = "Envoi en cours…";

      window.LeadSubmit.submit(payload)
        .then(function () {
          form.reset();
          openThanks(payload.prenom);
        })
        .catch(function (ex) {
          if (ex.fields) {
            showErrors(form, ex.fields);
          } else {
            showBanner(
              form,
              "Envoi impossible. Réessayez ou appelez le 873-353-5386."
            );
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (btnLabel) btnLabel.innerHTML = originalHtml;
        });
    });
  }

  bindLeadForm(sellForm);
  bindLeadForm(buyForm);

  document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (modal) modal.hidden = true;
    });
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.hidden = true;
    });
  }
})();
