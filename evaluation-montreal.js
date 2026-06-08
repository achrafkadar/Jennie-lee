(function () {
  var body = document.body;
  var navCta = document.getElementById("nav-cta");
  var sellBtn = document.querySelector('[data-intent-select="sell"]');
  var buyBtn = document.querySelector('[data-intent-select="buy"]');
  var sellForm = document.getElementById("sell-lead-form");
  var buyForm = document.getElementById("buy-lead-form");

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
      item.el.querySelectorAll("fieldset").forEach(function (fieldset) {
        fieldset.disabled = !active;
      });
    });
  }

  function msg(key) {
    if (window.SiteI18n && window.SiteI18n.t) return window.SiteI18n.t(key);
    var fallback = {
      "err.required": "Requis",
      "err.phone": "Téléphone invalide",
      "err.email": "Courriel invalide",
      "err.lang": "Choisissez FR ou EN",
      "err.formSummary": "Veuillez remplir tous les champs obligatoires.",
      "err.webhook":
        "Webhook Make non configuré (lead-config.js). Appelez le 873-353-5386.",
      "err.send":
        "Envoi impossible. Réessayez ou appelez le 873-353-5386.",
      "err.sending": "Envoi en cours…",
    };
    return fallback[key] || key;
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

    if (navCta && window.SiteI18n) {
      window.SiteI18n.onIntentChanged();
    } else if (navCta) {
      navCta.textContent =
        next === "buy" ? "Parler à Jennie-Lee" : "Évaluation gratuite";
    }

    if (window.SiteI18n) {
      window.SiteI18n.apply();
    } else {
      document.title =
        next === "buy"
          ? "Acheter en Outaouais · FlashImmobilier · Jennie Lee Desbiens"
          : "Évaluation gratuite · Gatineau & Outaouais · FlashImmobilier";
    }

    document.dispatchEvent(
      new CustomEvent("site-intent-changed", { detail: next })
    );

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

  function clearFieldState(form) {
    form.querySelectorAll("[data-error]").forEach(function (el) {
      el.textContent = "";
    });
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
      el.removeAttribute("aria-invalid");
    });
    form.classList.remove("form-card--invalid");
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

  function markInvalidFields(form, err) {
    Object.keys(err).forEach(function (key) {
      if (key === "langue") {
        var fs = form.querySelector(".form-lang");
        if (fs) {
          fs.classList.add("is-invalid");
          fs.setAttribute("aria-invalid", "true");
        }
        return;
      }
      var field = form.querySelector('[name="' + key + '"]');
      if (field) {
        field.classList.add("is-invalid");
        field.setAttribute("aria-invalid", "true");
      }
    });
    form.classList.add("form-card--invalid");
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

    if (!payload.prenom || !String(payload.prenom).trim()) err.prenom = msg("err.required");
    if (!payload.nom || !String(payload.nom).trim()) err.nom = msg("err.required");
    if (!payload.telephone || !String(payload.telephone).trim()) {
      err.telephone = msg("err.required");
    } else if (!window.LeadSubmit.validatePhone(payload.telephone)) {
      err.telephone = msg("err.phone");
    }
    if (!payload.email || !String(payload.email).trim()) {
      err.email = msg("err.required");
    } else if (!window.LeadSubmit.validateEmail(payload.email)) {
      err.email = msg("err.email");
    }
    if (payload.langue !== "FR" && payload.langue !== "EN") {
      err.langue = msg("err.lang");
    }

    if (intent === "sell") {
      if (!payload.adresse || String(payload.adresse).trim().length < 5) {
        err.adresse = msg("err.required");
      }
    }

    return err;
  }

  function goToThanks(prenom, intent) {
    var params = new URLSearchParams();
    params.set("prenom", String(prenom || "").trim());
    params.set("intent", intent === "buy" ? "buy" : "sell");
    if (window.SiteI18n && window.SiteI18n.getLang) {
      params.set("lang", window.SiteI18n.getLang());
    }
    window.location.href = "merci.html?" + params.toString();
  }

  function bindLeadForm(form) {
    if (!form || !window.LeadSubmit) return;

    form.addEventListener("input", function (e) {
      var t = e.target;
      if (!t || !t.classList || !t.classList.contains("is-invalid")) return;
      t.classList.remove("is-invalid");
      t.removeAttribute("aria-invalid");
      var key = t.name;
      if (key) {
        var errEl = form.querySelector('[data-error="' + key + '"]');
        if (errEl) errEl.textContent = "";
      }
    });

    form.addEventListener("change", function (e) {
      if (e.target && e.target.name === "langue") {
        var fs = form.querySelector(".form-lang");
        if (fs) {
          fs.classList.remove("is-invalid");
          fs.removeAttribute("aria-invalid");
        }
        var errLang = form.querySelector('[data-error="langue"]');
        if (errLang) errLang.textContent = "";
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFieldState(form);

      var payload = formToPayload(form);
      var err = validateClient(form, payload);
      if (Object.keys(err).length) {
        showErrors(form, err);
        markInvalidFields(form, err);
        showBanner(form, msg("err.formSummary"));
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        var firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          firstInvalid.focus();
        } else {
          var firstError = form.querySelector(".form-field-error:not(:empty)");
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
        return;
      }

      if (!window.LeadSubmit.webhookUrl()) {
        showBanner(form, msg("err.webhook"));
        return;
      }

      var submitBtn = form.querySelector("[data-lead-submit]");
      var btnLabel = submitBtn && submitBtn.querySelector("span");
      var originalHtml = btnLabel ? btnLabel.innerHTML : "";

      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = msg("err.sending");

      window.LeadSubmit.submit(payload)
        .then(function () {
          goToThanks(payload.prenom, payload.intent);
        })
        .catch(function (ex) {
          if (ex.fields) {
            showErrors(form, ex.fields);
            markInvalidFields(form, ex.fields);
          } else {
            showBanner(form, msg("err.send"));
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
})();
