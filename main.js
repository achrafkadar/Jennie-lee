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

  var header = document.querySelector(".site-header--lux");
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

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

  var form = document.getElementById("lead-form");
  var modal = document.getElementById("thanks-modal");
  var thanksName = document.getElementById("thanks-name");

  if (!form) return;

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

/** GSAP + ScrollTrigger : hero, scroll reveals, icônes, boutons magnétiques */
(function initLuxMotion() {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof gsap === "undefined") return;

  if (!reduce) {
    var inner = document.querySelector(".hero-landing__inner");
    if (inner) {
      gsap.from(inner.children, {
        autoAlpha: 0,
        y: 36,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }

    document.querySelectorAll("[data-icon-float]").forEach(function (el, i) {
      gsap.to(el, {
        y: -5,
        duration: 1.6 + i * 0.12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.15,
      });
    });

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray("[data-reveal]").forEach(function (el) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });
      gsap.utils.toArray("[data-stagger]").forEach(function (container) {
        var ch = gsap.utils.toArray(container.children);
        if (!ch.length) return;
        gsap.from(ch, {
          scrollTrigger: {
            trigger: container,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          y: 32,
          autoAlpha: 0,
          stagger: 0.11,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    }

    document.querySelectorAll(".btn-magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, {
          x: x * 0.12,
          y: y * 0.1,
          duration: 0.35,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }
})();
