/**
 * Optionnel : URL webhook (Make.com, etc.) en POST JSON.
 * Laissez vide pour ouvrir le courriel avec le résumé du formulaire.
 */
var WEBHOOK_URL = "";

(function () {
  function scrollToForm() {
    var el = document.getElementById("estimation-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-scroll-form]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToForm();
    });
  });

  var params = new URLSearchParams(window.location.search);
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ].forEach(function (key) {
    var v = params.get(key);
    var input = document.querySelector('input[name="' + key + '"]');
    if (input && v) input.value = v;
  });
  var ref = document.querySelector('input[name="referrer"]');
  if (ref) ref.value = document.referrer || "";
  var page = document.querySelector('input[name="page_url"]');
  if (page) page.value = window.location.href;

  var phoneRe =
    /^(\+?1[\s.-]?)?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})$/;

  function validate(data) {
    var err = {};
    if (!data.prenom.trim()) err.prenom = "Le prénom est requis";
    if (!data.nom.trim()) err.nom = "Le nom est requis";
    if (!phoneRe.test(data.telephone.replace(/\s/g, "")))
      err.telephone = "Format téléphone canadien attendu";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      err.email = "Courriel invalide";
    if (data.adresse.trim().length < 5) err.adresse = "L’adresse est requise";
    if (!data.typePropriete) err.typePropriete = "Choisissez un type";
    if (!data.quandVendre) err.quandVendre = "Ce champ est requis";
    return err;
  }

  function showErrors(err) {
    document.querySelectorAll("[data-error]").forEach(function (el) {
      el.textContent = "";
    });
    Object.keys(err).forEach(function (key) {
      var el = document.querySelector('[data-error="' + key + '"]');
      if (el) el.textContent = err[key];
    });
  }

  var form = document.getElementById("lead-form");
  var modal = document.getElementById("thanks-modal");
  var thanksName = document.getElementById("thanks-name");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var data = {
      prenom: fd.get("prenom") || "",
      nom: fd.get("nom") || "",
      telephone: fd.get("telephone") || "",
      email: fd.get("email") || "",
      adresse: fd.get("adresse") || "",
      typePropriete: fd.get("typePropriete") || "",
      quandVendre: fd.get("quandVendre") || "",
      utm_source: fd.get("utm_source") || "",
      utm_medium: fd.get("utm_medium") || "",
      utm_campaign: fd.get("utm_campaign") || "",
      utm_content: fd.get("utm_content") || "",
      utm_term: fd.get("utm_term") || "",
      referrer: fd.get("referrer") || "",
      page_url: fd.get("page_url") || "",
      gclid: fd.get("gclid") || "",
      fbclid: fd.get("fbclid") || "",
    };

    var err = validate(data);
    if (Object.keys(err).length) {
      showErrors(err);
      return;
    }
    showErrors({});

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    function doneOk() {
      if (thanksName) thanksName.textContent = data.prenom.trim();
      if (modal) modal.classList.add("is-open");
      if (submitBtn) submitBtn.disabled = false;
    }

    function doneFail() {
      alert(
        "L’envoi a échoué. Réessayez ou appelez le 873-353-5386. Si vous utilisez un webhook, vérifiez WEBHOOK_URL dans main.js."
      );
      if (submitBtn) submitBtn.disabled = false;
    }

    if (WEBHOOK_URL && WEBHOOK_URL.indexOf("http") === 0) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            doneOk();
          } else doneFail();
        })
        .catch(doneFail);
      return;
    }

    var lines = Object.keys(data)
      .map(function (k) {
        return k + ": " + data[k];
      })
      .join("\n");
    var subject = encodeURIComponent("Demande d’estimation gratuite");
    var body = encodeURIComponent(lines);
    window.location.href =
      "mailto:jennieleedesbiens@gmail.com?subject=" + subject + "&body=" + body;
    setTimeout(doneOk, 400);
  });

  var closeBtn = document.querySelector("[data-close-modal]");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("is-open");
    });
  }
})();
